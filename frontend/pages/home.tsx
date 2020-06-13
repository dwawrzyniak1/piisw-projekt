import React, { useEffect, useState } from 'react';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import Song from '../models/Song';
import { playSong } from '../requests/spotify/player';
import SongDropdownSearch from '../components/searching/SongDropdownSearch';

const Home: React.FC = () => {
  const [lastSongs, setLastSongs] = useState<Song[]>([]);
  const [lastSongsLoadError, setLastSongsLoadError] = useState<string>('');

  useEffect(() => {
    (async () => {
      loadRecentSongsInfo();
    })();
  }, []);

  const loadRecentSongsInfo = async () => {
    const [loadedSongs, error] = await get20lastPlayedSongs();
    setLastSongs(loadedSongs);
    setLastSongsLoadError(error);
  };

  const renderSongs = (songs: Song[]) => {
    return (
      <ol>
        {songs.map((song: Song, index: number) => (
          <li key={index}>
            <b>{song.title}</b>
            <br />
            {song.artists.join(', ')}
            <br />
            {song.album.title}
            {song.album.releaseDate ? (
              <span>
                <br />
                Release date:
                <i> {song.album.releaseDate}</i>
              </span>
            ) : (
              ''
            )}
            {song.popularity ? (
              <span>
                <br />
                Popularity:
                <i> {song.popularity}</i>
              </span>
            ) : (
              ''
            )}
            <br />
            <img src={song.album.albumSmallCoverUrl}></img>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div>
      <h2>Seach:</h2>
      <div>
        <SongDropdownSearch onSelectCallback={playSong} />
      </div>
      <h2>20 last played songs:</h2>
      <div>
        {renderSongs(lastSongs)}
        {lastSongsLoadError !== '' ? <p>Error: {lastSongsLoadError}</p> : ''}
      </div>
    </div>
  );
};

export default Home;
