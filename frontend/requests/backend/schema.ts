export interface SongWithoutLyrics {
  title: string,
  artist: string,
  album: string,
  spotifyUri: string,
  spotifyPhotoUlr: string,
  releaseYear: number
}

export interface SongQuery {
  username: string,
  song: SongWithoutLyrics
}

export interface BackendSongResponse {
  song: SongWithLyrics,
  favourite: boolean
}

export interface SongWithLyrics {
  id: number,
  title: string,
  artist: string,
  album: string,
  photoUrl: string,
  lyrics: string
}