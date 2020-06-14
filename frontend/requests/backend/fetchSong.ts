import { BackendSongResponse, SongQuery } from './schema';
import { fetchBackend } from './fetchBackend';

export const fetchSong = async (query: SongQuery): Promise<BackendSongResponse> => {
  const response = await fetchBackend('/song', 'POST', query);
  const data = await response.json();
  return { ...data };
};
