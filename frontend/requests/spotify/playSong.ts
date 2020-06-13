import Song from '../../models/Song';
import { fetchSpotify, Track } from './fetchSpotify';

const playSong = async (song: Song): Promise<Response> => {
  return fetchSpotify('https://api.spotify.com/v1/me/player/play', 'PUT', {
    uris: [song.spotifyUri],
  });
};

export default playSong;
