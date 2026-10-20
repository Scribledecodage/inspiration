'use strict';

const admin = require('firebase-admin');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID ??
  process.env.GCLOUD_PROJECT ??
  process.env.GOOGLE_CLOUD_PROJECT ??
  'mont2-tweet';
const bucketsToClean = ['Infini'];
const pageSize = 100;
const deleteBatchSize = 100;
const minimumAgeHours = Number(process.env.SUPABASE_ORPHAN_MIN_AGE_HOURS ?? 24);
const shouldDelete = process.argv.includes('--delete');

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY).'
  );
}

if (!Number.isFinite(minimumAgeHours) || minimumAgeHours < 0) {
  throw new Error(
    'SUPABASE_ORPHAN_MIN_AGE_HOURS must be a non-negative number.'
  );
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  ...(projectId ? { projectId } : {})
});

const firestore = admin.firestore();

async function requestSupabase(path, options = {}) {
  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}${path}`, {
    ...options,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${detail}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function addReferencedUrl(references, value, bucket) {
  if (typeof value !== 'string') return;

  let pathname;
  try {
    pathname = new URL(value).pathname;
  } catch {
    return;
  }

  const marker = `/storage/v1/object/public/${bucket}/`;
  const markerIndex = pathname.indexOf(marker);
  if (markerIndex === -1) return;

  const encodedPath = pathname.slice(markerIndex + marker.length);
  try {
    references.get(bucket).add(decodeURIComponent(encodedPath));
  } catch {
    references.get(bucket).add(encodedPath);
  }
}

async function collectReferences() {
  const references = new Map(
    bucketsToClean.map((bucket) => [bucket, new Set()])
  );
  const [users, tweets] = await Promise.all([
    firestore.collection('users').get(),
    firestore.collection('tweets').get()
  ]);

  for (const user of users.docs) {
    const data = user.data();
    addReferencedUrl(references, data.photoURL, 'avatars');
    addReferencedUrl(references, data.coverPhotoURL, 'avatars');
  }

  for (const tweet of tweets.docs) {
    const images = tweet.data().images;
    if (!Array.isArray(images)) continue;
    for (const image of images) {
      addReferencedUrl(references, image?.src, 'chat-files');
    }
  }

  return references;
}

async function listFolder(bucket, prefix = '') {
  const objects = [];
  const folders = [];
  let offset = 0;

  while (true) {
    const rows = await requestSupabase(
      `/storage/v1/object/list/${encodeURIComponent(bucket)}`,
      {
        method: 'POST',
        body: JSON.stringify({
          prefix,
          limit: pageSize,
          offset,
          sortBy: { column: 'name', order: 'asc' }
        })
      }
    );

    for (const row of rows) {
      if (row.id == null && row.metadata == null) {
        folders.push(prefix ? `${prefix}/${row.name}` : row.name);
      } else {
        objects.push({
          path: prefix ? `${prefix}/${row.name}` : row.name,
          createdAt: row.created_at ?? row.updated_at,
          size: Number(row.metadata?.size ?? 0)
        });
      }
    }

    if (rows.length < pageSize) break;
    offset += rows.length;
  }

  for (const folder of folders) {
    objects.push(...(await listFolder(bucket, folder)));
  }

  return objects;
}

async function main() {
  const existingBuckets = await requestSupabase('/storage/v1/bucket');
  const availableBuckets = new Set(existingBuckets.map(({ name }) => name));
  const buckets = bucketsToClean.filter((bucket) =>
    availableBuckets.has(bucket)
  );

  if (!buckets.length) {
    throw new Error('Neither expected bucket (avatars, chat-files) exists.');
  }

  const [references, ...objectsByBucket] = await Promise.all([
    collectReferences(),
    ...buckets.map((bucket) => listFolder(bucket))
  ]);
  const cutoff = Date.now() - minimumAgeHours * 60 * 60 * 1000;
  const orphans = new Map();
  let skippedUnknownAge = 0;

  buckets.forEach((bucket, index) => {
    const unused = objectsByBucket[index].filter((object) => {
      if (references.get(bucket).has(object.path)) return false;
      const createdAt = Date.parse(object.createdAt ?? '');
      if (!Number.isFinite(createdAt)) {
        skippedUnknownAge += 1;
        return false;
      }
      return createdAt <= cutoff;
    });
    orphans.set(bucket, unused);
  });

  const orphanCount = [...orphans.values()].reduce(
    (total, objects) => total + objects.length,
    0
  );
  const reclaimableBytes = [...orphans.values()]
    .flat()
    .reduce((total, object) => total + object.size, 0);

  console.log(`Mode: ${shouldDelete ? 'DELETE' : 'DRY RUN'}`);
  console.log(`Minimum age: ${minimumAgeHours} hour(s)`);
  console.log(`Orphan objects: ${orphanCount}`);
  console.log(
    `Approximate space: ${(reclaimableBytes / 1024 / 1024).toFixed(2)} MiB`
  );
  if (skippedUnknownAge) {
    console.log(`Skipped objects with unknown age: ${skippedUnknownAge}`);
  }

  for (const [bucket, objects] of orphans) {
    for (const object of objects) {
      console.log(`${bucket}/${object.path}`);
    }
  }

  if (!shouldDelete || orphanCount === 0) return;

  for (const [bucket, objects] of orphans) {
    for (let index = 0; index < objects.length; index += deleteBatchSize) {
      const paths = objects
        .slice(index, index + deleteBatchSize)
        .map(({ path }) => path);
      await requestSupabase(
        `/storage/v1/object/${encodeURIComponent(bucket)}`,
        { method: 'DELETE', body: JSON.stringify({ prefixes: paths }) }
      );
      console.log(`Deleted ${paths.length} object(s) from ${bucket}.`);
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
