import Album from '../models/Album';

class Song {
  title: string;
  artists: string[];
  album: Album;
  popularity?: number;
  spotifyUri?: string;
}
export default Song;
