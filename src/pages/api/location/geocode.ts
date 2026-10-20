import type { NextApiRequest, NextApiResponse } from 'next';

type GeocodeResponse = {
  lat: number | null;
  lon: number | null;
  label: string | null;
  error?: string;
};

type PhotonFeature = {
  geometry?: { coordinates?: number[] };
  properties?: { name?: string; city?: string; country?: string };
};

type PhotonResponse = {
  features?: PhotonFeature[];
};

export default async function geocodeEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<GeocodeResponse>
): Promise<void> {
  const { q } = req.query;
  const query = typeof q === 'string' ? q.trim() : '';

  if (!query) {
    res.status(400).json({ lat: null, lon: null, label: null, error: 'Missing q' });
    return;
  }

  try {
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1&lang=fr`,
      { headers: { 'User-Agent': 'TwitterClone/1.0' } }
    );

    if (response.ok) {
      const data = (await response.json()) as PhotonResponse;
      const feature = data.features?.[0];
      const coords = feature?.geometry?.coordinates;

      if (coords && coords.length >= 2) {
        const [lon, lat] = coords;
        res.status(200).json({ lat, lon, label: query });
        return;
      }
    }
  } catch {
    // ignore
  }

  res.status(200).json({ lat: null, lon: null, label: query });
}
