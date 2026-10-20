import { AUTH } from '@lib/api/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  TrendsData,
  ErrorResponse,
  TrendsResponse,
  FilteredTrends
} from '@lib/types/place';

type PlaceIdEndpointQuery = {
  id: string;
  limit?: string;
};

const fallbackTrends: TrendsResponse = {
  trends: [],
  location: 'Monde entier'
};

export default async function placeIdEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<TrendsResponse | ErrorResponse>
): Promise<void> {
  const { id, limit } = req.query as PlaceIdEndpointQuery;

  // Twitter's legacy trends API returns 401 when the optional bearer token is
  // missing or expired. Trends are supplementary, so do not break the page
  // when that service is unavailable.
  if (!process.env.TWITTER_BEARER_TOKEN) {
    res.status(200).json(fallbackTrends);
    return;
  }

  try {
    const response = await fetch(
      `https://api.twitter.com/1.1/trends/place.json?id=${id}`,
      AUTH
    );

    if (!response.ok) {
      res.status(200).json(fallbackTrends);
      return;
    }

    const rawData = (await response.json()) as TrendsData | ErrorResponse;

    if ('errors' in rawData || !Array.isArray(rawData) || !rawData[0]) {
      res.status(200).json(fallbackTrends);
      return;
    }

    const data = {
      trends: rawData[0].trends,
      location: rawData[0].locations[0].name
    };

    const limitParam = limit ? parseInt(limit, 10) : null;
    let formattedTrends = data.trends.filter(
      ({ tweet_volume }) => tweet_volume
    ) as FilteredTrends;

    formattedTrends = formattedTrends
      .map(({ url, ...rest }) => ({
        ...rest,
        url: url.replace(/http.*.com/, '')
      }))
      .sort((a, b) => b.tweet_volume - a.tweet_volume);

    if (limitParam) formattedTrends = formattedTrends.slice(0, limitParam);

    res.status(200).json({ ...data, trends: formattedTrends });
  } catch {
    res.status(200).json(fallbackTrends);
  }
}
