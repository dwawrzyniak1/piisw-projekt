import Song from '../../models/Song';
import { fetchSpotify, Track } from './fetchSpotify';
import { HTTP_OK } from '../../constants/httpCodes';

const get20lastPlayedSongs = async (): Promise<[Song[], string]> => {
  let errorMessage = '';
  const songs: Song[] = [];

  const response = await fetchSpotify(
    'https://api.spotify.com/v1/me/player/recently-played',
    'GET'
  );
  if (response.status !== HTTP_OK) {
    errorMessage = response.statusText;
    return [songs, errorMessage];
  }

  const data = await response.json();
  data.items.forEach((item: { track: Track }) => {
    const track = item.track;

    const title = track.name;
    const artists = track.artists.map((artist: { name: string }) => artist.name);
    const spotifyUri = track.uri;
    const albumTitle = track.album.name;
    const albumBigCoverUrl = track.album.images[0].url;
    const albumMediumCoverUrl = track.album.images[1].url;
    const albumSmallCoverUrl = track.album.images[2].url;
    songs.push({
      title,
      artists,
      spotifyUri,
      album: {
        albumBigCoverUrl,
        albumMediumCoverUrl,
        albumSmallCoverUrl,
        title: albumTitle,
      },
    });
  });

  return [songs, errorMessage];
};

export default get20lastPlayedSongs;
