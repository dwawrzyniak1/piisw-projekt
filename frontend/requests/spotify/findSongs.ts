import Song from '../../models/Song';
import { fetchSpotify, Track } from './fetchSpotify';
import { HTTP_OK } from '../../constants/httpCodes';
import { extractSong } from '../../utils/spotifyData';

const findSongs = async (query: string): Promise<[Song[], string]> => {
  const SEARCH_SCOPE = ['track']; // , 'artist', 'album'];
  const SONGS_PER_SCOPE = 4;

  let errorMessage = '';
  const songs: Song[] = [];

  const response = await fetchSpotify(
    `https://api.spotify.com/v1/search?q=${query}&type=${SEARCH_SCOPE.join(
      ','
    )}&limit=${SONGS_PER_SCOPE}`,
    'GET'
  );
  if (response.status !== HTTP_OK) {
    errorMessage = response.statusText;
    return [songs, errorMessage];
  }
  const data = await response.json();
  data.tracks.items.forEach((track: Track) => {
    songs.push(extractSong(track));
  });

  return [songs, errorMessage];
};

export default findSongs;
