import { getAccessToken, getTokenType, getTokenExpirationTime } from '../utils/localStorage';
import React, { useEffect, useState } from 'react';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import Song from '../models/Song';

const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [songsLoadError, setSongsLoadError] = useState<string>('');

  useEffect(() => {
    (async () => {
      loadSongsInfo();
    })();
  }, []);

  const loadSongsInfo = async () => {
    const [loadedSongs, error] = await get20lastPlayedSongs(getAccessToken(), getTokenType());
    setSongs(loadedSongs);
    setSongsLoadError(error);
  };

  return (
    <div>
      <h2>20 last played songs:</h2>
      <ol>
        {songs.map((song, index) => (
          <li key={index}>
            <b>{song.title}</b>
            <br />
            {song.artists}
            <br />
            <img src={song.albumSmallCoverUrl}></img>
          </li>
        ))}
      </ol>
      {songsLoadError !== '' ? <p>Error: {songsLoadError}</p> : ''}
    </div>
  );
};

export default Home;
