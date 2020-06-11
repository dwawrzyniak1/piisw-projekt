import { getTokenType, getAccessToken } from '../../utils/localStorage';

export type Track = {
  name: string;
  popularity: number;
  artists: { name: string }[];
  album: { name: string; release_date: string; images: { url: string }[] };
};

export const fetchSpotify = (url: string, method: string): Promise<Response> => {
  const headers: any = {
    'Content-Type': 'application/json',
    Authorization: `${getTokenType()} ${getAccessToken()}`,
  };

  return fetch(url, { method, headers });
};
