import type { NextApiRequest, NextApiResponse } from 'next';

type SuggestionItem = {
  label: string;
  city?: string;
  country?: string;
};

type SuggestResponse = {
  suggestions?: SuggestionItem[];
  location?: string | null;
  error?: string;
};

type PhotonFeature = {
  properties?: {
    city?: string;
    name?: string;
    locality?: string;
    district?: string;
    state?: string;
    country?: string;
  };
};

type PhotonResponse = {
  features?: PhotonFeature[];
};

type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  country?: string;
};

type NominatimResponse = {
  address?: NominatimAddress;
};

const POPULAR_FALLBACK_CITIES: readonly string[] = [
  'Paris, France',
  'Marseille, France',
  'Lyon, France',
  'Toulouse, France',
  'Nice, France',
  'Nantes, France',
  'Montpellier, France',
  'Strasbourg, France',
  'Bordeaux, France',
  'Lille, France',
  'Rennes, France',
  'Bruxelles, Belgique',
  'Genève, Suisse',
  'Montréal, Canada',
  'Québec, Canada',
  'Casablanca, Maroc',
  'Alger, Algérie',
  'Tunis, Tunisie',
  'Dakar, Sénégal',
  'Abidjan, Côte d’Ivoire',
  'Londres, Royaume-Uni',
  'Berlin, Allemagne',
  'Madrid, Espagne',
  'Rome, Italie',
  'Tokyo, Japon',
  'New York, États-Unis'
];

function cleanPlaceParts(parts: (string | undefined | null)[]): string {
  const filtered = parts.map((p) => p?.trim()).filter(Boolean) as string[];
  const unique = Array.from(new Set(filtered));
  return unique.join(', ');
}

export default async function locationSuggestEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<SuggestResponse>
): Promise<void> {
  const { q, lat, lon } = req.query;

  const latitude =
    typeof lat === 'string' ? lat : Array.isArray(lat) ? lat[0] : null;
  const longitude =
    typeof lon === 'string' ? lon : Array.isArray(lon) ? lon[0] : null;

  // 1. Reverse geocoding via coordinates (Position)
  if (latitude && longitude) {
    try {
      const response = await fetch(
        `https://photon.komoot.io/reverse?lat=${encodeURIComponent(
          latitude
        )}&lon=${encodeURIComponent(longitude)}`,
        { headers: { 'User-Agent': 'TwitterClone/1.0' } }
      );

      if (response.ok) {
        const data = (await response.json()) as PhotonResponse;
        const p = data.features?.[0]?.properties;
        if (p) {
          const city = p.city ?? p.name ?? p.locality ?? p.district;
          const country = p.country;
          const label = cleanPlaceParts([city, country]);
          if (label) {
            res.status(200).json({ location: label });
            return;
          }
        }
      }

      // Fallback Nominatim
      const nomRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
          latitude
        )}&lon=${encodeURIComponent(longitude)}`,
        { headers: { 'User-Agent': 'TwitterClone/1.0' } }
      );
      if (nomRes.ok) {
        const nomData = (await nomRes.json()) as NominatimResponse;
        const addr = nomData.address;
        const city =
          addr?.city ?? addr?.town ?? addr?.village ?? addr?.municipality;
        const country = addr?.country;
        const label = cleanPlaceParts([city, country]);
        if (label) {
          res.status(200).json({ location: label });
          return;
        }
      }
    } catch {
      // Ignore network errors and continue
    }

    res.status(200).json({ location: null });
    return;
  }

  // 2. Autocomplete search query
  const query = typeof q === 'string' ? q.trim() : '';

  if (!query) {
    res.status(200).json({
      suggestions: POPULAR_FALLBACK_CITIES.slice(0, 8).map((city) => ({
        label: city
      }))
    });
    return;
  }

  try {
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(
        query
      )}&limit=7&lang=fr`,
      { headers: { 'User-Agent': 'TwitterClone/1.0' } }
    );

    if (response.ok) {
      const data = (await response.json()) as PhotonResponse;
      const features = data.features ?? [];

      const suggestions: SuggestionItem[] = features
        .map((f) => {
          const p = f.properties;
          const city = p?.city ?? p?.name;
          const state = p?.state !== city ? p?.state : undefined;
          const country = p?.country;
          const label = cleanPlaceParts([city, state, country]);
          return { label, city, country };
        })
        .filter((item) => Boolean(item.label));

      // Remove duplicates by label
      const seen = new Set<string>();
      const uniqueSuggestions = suggestions.filter((item) => {
        if (seen.has(item.label.toLowerCase())) return false;
        seen.add(item.label.toLowerCase());
        return true;
      });

      if (uniqueSuggestions.length > 0) {
        res.status(200).json({ suggestions: uniqueSuggestions });
        return;
      }
    }
  } catch {
    // Network failure, fallback to local search
  }

  // Fallback search
  const filteredFallback = POPULAR_FALLBACK_CITIES.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  ).map((label) => ({ label }));

  res.status(200).json({
    suggestions:
      filteredFallback.length > 0 ? filteredFallback : [{ label: query }]
  });
}
