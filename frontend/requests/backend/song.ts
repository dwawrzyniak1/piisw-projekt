import { BackendSongResponse, SongQuery } from './schema';
import { fetchBackend } from './fetchBackend';
import { handleError } from './errorHandlers';

export const fetchSong = async (query: SongQuery): Promise<BackendSongResponse | string> => {
  try {
    const response = await fetchBackend('/song', 'POST', query);
    return await response.json();
  } catch (e) {
    return handleError(e);
  }
};

export const markAsFavourite = async (username: string, songId: number): Promise<string> => {
  try {
    const response = await fetchBackend(`/song/${songId}`, 'POST', username);
    return await response.text();
  } catch (e) {
    return handleError(e);
  }
};

export const deleteFromFavourite = async (username: string, songId: number): Promise<string> => {
  try {
    const response = await fetchBackend(`/song/${songId}`, 'DELETE', username);
    return await response.text();
  } catch (e) {
    return handleError(e);
  }
};