import React, { useEffect, useState } from 'react';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import { getUserInfo } from '../requests/spotify/user';
import Song from '../models/Song';
import { Layout, Card, Alert } from 'antd';
import Colors from '../constants/colors';
import NavigationBar from '../components/topBar/NavigationBar';
import { saveToLocalStorage, getUserId } from '../utils/localStorage';
import { USER_ID_KEY } from '../constants/spotify';

const Home: React.FC = () => {
  const CARD_HEIGHT = '7.5em';
  // React has a problem with this as an inline style

  const [lastSongs, setLastSongs] = useState<Song[]>([]);
  const [lastSongsLoadError, setLastSongsLoadError] = useState<string>('');

  const { Content } = Layout;

  useEffect(() => {
    (async () => {
      loadRecentSongsInfo();
      saveUserToLocalStorage();
    })();
  }, []);

  const loadRecentSongsInfo = async () => {
    const [loadedSongs, error] = await get20lastPlayedSongs();
    setLastSongs(loadedSongs);
    setLastSongsLoadError(error);
  };

  const saveUserToLocalStorage = async () => {
    if (!getUserId()) {
      const [id, accountType, error] = await getUserInfo();
      saveToLocalStorage({ [USER_ID_KEY]: id });
    }
  };

  const renderSongs = (songs: Song[]) => {
    return (
      <div style={{ width: '90%', margin: 'auto' }}>
        {songs.map((song: Song, index: number) => (
          <Card
            key={index}
            style={{
              marginBottom: '8px',
              maxHeight: '10%',
              border: 0,
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            <li>
              <div>
                <div>
                  <img
                    src={song.album.albumMediumCoverUrl}
                    style={{
                      marginRight: '1.5em',
                      float: 'left',
                      width: CARD_HEIGHT,
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      height: CARD_HEIGHT,
                    }}
                  >
                    <div style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                      <p
                        style={{
                          marginBottom: 0,
                          fontSize: '19px',
                          fontWeight: 'bold',
                        }}
                      >
                        {song.title}
                      </p>
                      <p
                        style={{
                          fontSize: '17px',
                          marginBottom: 0,
                        }}
                      >
                        {song.artists.join(', ')}
                      </p>
                      <p
                        style={{
                          marginBottom: 0,
                          fontStyle: 'italic',
                          fontSize: '16px',
                        }}
                      >
                        {`${song.album.title} (${song.album.releaseDate?.split('-')[0]})`}
                      </p>
                    </div>
                    <div
                      style={{
                        marginBottom: 'auto',
                        marginTop: 'auto',
                        marginRight: '1em',
                        backgroundColor: '#aaa',
                      }}
                    >
                      PLAY
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <NavigationBar />
      <Layout className="layout" style={{ width: '100%' }}>
        <Content
          style={{
            padding: '0 50px',
            backgroundColor: Colors.backgroundColor,
            paddingTop: '2%',
            maxHeight: 'auto',
          }}
        >
          <div>{renderSongs(lastSongs)}</div>
        </Content>
        {lastSongsLoadError !== '' ? (
          <Alert type="error" message={`An error has occured! (${lastSongsLoadError})`} banner />
        ) : (
          ''
        )}
      </Layout>
    </div>
  );
};

export default Home;
