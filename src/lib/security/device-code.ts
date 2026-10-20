/**
 * « Code de l'appareil » : un code à 4 chiffres choisi par la personne,
 * conservé uniquement dans le navigateur de cet appareil (haché, jamais en
 * clair, jamais envoyé à un serveur). Il protège l'affichage des mots de
 * passe et les actions sensibles depuis ce navigateur.
 */

const STORAGE_PREFIX = 'inspiration.deviceCode';

export const DEVICE_CODE_LENGTH = 4;

type DeviceCodeRecord = {
  hash: string;
  salt: string;
  createdAt: string;
};

export function isValidDeviceCodeFormat(code: string): boolean {
  return new RegExp(`^\\d{${DEVICE_CODE_LENGTH}}$`).test(code.trim());
}

function storageKey(userId: string): string {
  return `${STORAGE_PREFIX}:${userId}`;
}

function randomSalt(): string {
  const bytes = new Uint8Array(16);

  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto)
    crypto.getRandomValues(bytes);
  else
    for (let index = 0; index < bytes.length; index += 1)
      bytes[index] = Math.floor(Math.random() * 256);

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}

async function hashCode(code: string, salt: string): Promise<string> {
  const value = `${salt}::${code}`;

  if (typeof crypto !== 'undefined' && crypto.subtle)
    try {
      const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(value)
      );

      return Array.from(new Uint8Array(digest), (byte) =>
        byte.toString(16).padStart(2, '0')
      ).join('');
    } catch {
      // Contexte non sécurisé : on retombe sur l'empreinte ci-dessous.
    }

  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }

  return `fnv1a-${hash.toString(16)}`;
}

function readRecord(userId: string): DeviceCodeRecord | null {
  if (typeof window === 'undefined' || !userId) return null;

  try {
    const rawValue = window.localStorage.getItem(storageKey(userId));
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as Partial<DeviceCodeRecord>;
    if (!parsed.hash || !parsed.salt) return null;

    return {
      hash: parsed.hash,
      salt: parsed.salt,
      createdAt: parsed.createdAt ?? ''
    };
  } catch {
    return null;
  }
}

export function hasDeviceCode(userId: string): boolean {
  return readRecord(userId) !== null;
}

export function getDeviceCodeCreatedAt(userId: string): string | null {
  return readRecord(userId)?.createdAt ?? null;
}

export async function createDeviceCode(
  userId: string,
  code: string
): Promise<void> {
  if (typeof window === 'undefined')
    throw new Error('Le code de l’appareil ne peut être créé que dans un navigateur.');

  const salt = randomSalt();

  const record: DeviceCodeRecord = {
    hash: await hashCode(code.trim(), salt),
    salt,
    createdAt: new Date().toISOString()
  };

  window.localStorage.setItem(storageKey(userId), JSON.stringify(record));
}

export async function verifyDeviceCode(
  userId: string,
  code: string
): Promise<boolean> {
  const record = readRecord(userId);
  if (!record) return false;

  return record.hash === (await hashCode(code.trim(), record.salt));
}

export function removeDeviceCode(userId: string): void {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(storageKey(userId));
}
