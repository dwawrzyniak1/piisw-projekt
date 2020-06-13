import Song from '../../models/Song';
import { fetchSpotify } from './fetchSpotify';
import { HTTP_OK, HTTP_NO_CONTENT } from '../../constants/httpCodes';
import { extractSong } from '../../utils/spotifyData';

export const playSong = async (song: Song): Promise<Response> => {
  return fetchSpotify('https://api.spotify.com/v1/me/player/play', 'PUT', {
    uris: [song.spotifyUri],
  });
};

/**
 * @returns [
 *  played or paused SONG if there are no errors, else null,
 *  true if SONG is being played, else false,
 *  error message
 * ]
 * @example
 *  song:
 *   playing: [{...}, true, '']
 *   stopped: [{...}, false, '']
 *   errored: [null, false, 'Unauthorized']
 *  podcasts and other types:
 *   playing: [null, false, '']
 *   stopped: [null, false, '']
 *   errored: [null, false, 'Unauthorized']
 */
export const getNowPlaying = async (): Promise<[Song | null, boolean, string]> => {
  const response = await fetchSpotify(
    'https://api.spotify.com/v1/me/player/currently-playing',
    'GET'
  );
  if (response.status !== HTTP_OK && response.status !== HTTP_NO_CONTENT) {
    return [null, false, response.statusText];
  }
  const data = await response.json();
  console.log(data);
  if (data.currently_playing_type === 'track') {
    return [extractSong(data.item), data.is_playing, ''];
  }

  return [null, false, ''];
};
