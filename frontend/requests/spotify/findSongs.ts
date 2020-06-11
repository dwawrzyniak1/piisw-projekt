import { getTokenType, getAccessToken } from '../../utils/localStorage';
import Song from '../../models/Song';
import Album from '../../models/Album';

const findSongs = async (query: string): Promise<[Song[], string]> => {
  const SEARCH_SCOPE = ['track']; // , 'artist', 'album'];
  const SONGS_PER_SCOPE = 5;

  let errorMessage = '';
  const songs: Song[] = [];

  const requestHeaders: any = {
    'Content-Type': 'application/json',
    Authorization: `${getTokenType()} ${getAccessToken()}`,
  };
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${SEARCH_SCOPE.join(
      ','
    )}&limit=${SONGS_PER_SCOPE}`,
    {
      method: 'GET',
      headers: requestHeaders,
    }
  );
  if (response.status !== 200) {
    errorMessage = response.statusText;
    return [songs, errorMessage];
  }
  const data = await response.json();
  data.tracks.items.forEach(
    (track: {
      name: string;
      popularity: number;
      artists: { name: string }[];
      album: { name: string; release_date: string; images: { url: string }[] };
    }) => {
      songs.push({
        title: track.name,
        artists: track.artists.map((artist: { name: string }) => artist.name),
        album: {
          title: track.album.name,
          albumBigCoverUrl: track.album.images[0].url,
          albumMediumCoverUrl: track.album.images[1].url,
          albumSmallCoverUrl: track.album.images[2].url,
          releaseDate: track.album.release_date,
        },
        popularity: track.popularity,
      });
    }
  );

  return [songs, errorMessage];
};

export default findSongs;
