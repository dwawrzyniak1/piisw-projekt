import { BackendSongResponse, SongQuery } from './schema';
import { fetchBackend } from './fetchBackend';
import { handleError } from './errorHandlers';

export const fetchSong = async (query: SongQuery): Promise<BackendSongResponse | string> => {
  try {
    const response = await fetchBackend('/song', 'POST', query);
    const data = await response.json();
    return { ...data };
  } catch (e) {
    return handleError(e);
  }
};