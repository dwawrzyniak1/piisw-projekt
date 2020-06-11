import Album from '../models/Album';

class Song {
  title: string;
  artists: string[];
  album: Album;
  popularity?: number;
}
export default Song;
