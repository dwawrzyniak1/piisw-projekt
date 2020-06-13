import React, { useEffect, useState } from 'react';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import Song from '../models/Song';
import { playSong } from '../requests/spotify/player';
import SongDropdownSearch from '../components/searching/SongDropdownSearch';
import { Layout, Table, Card, Alert } from 'antd';
import Colors from '../constants/colors';

const Home: React.FC = () => {
  const CARD_HEIGHT = '7.5em';
  // React has a problem with this as an inline style

  const [lastSongs, setLastSongs] = useState<Song[]>([]);
  const [lastSongsLoadError, setLastSongsLoadError] = useState<string>('');

  const { Content, Header } = Layout;

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
      <div style={{ width: '90%', margin: 'auto' }}>
        {songs.map((song: Song, index: number) => (
          <Card
            style={{
              marginBottom: '8px',
              maxHeight: '10%',
              border: 0,
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            <li key={index}>
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
      <Layout className="layout" style={{ width: '100%' }}>
        <Header
          style={{
            width: '100%',
            backgroundColor: Colors.primaryColor,
          }}
        >
          <div className="logo">
            <img
              src="/spotify.svg"
              alt="Vercel Logo"
              className="logo"
              style={{
                width: '30px',
                height: '30px',
              }}
            />
            <span className="logoTitle">Spotify Lyrics</span>
          </div>
        </Header>
        <Content
          style={{
            padding: '0 50px',
            backgroundColor: Colors.backgroundColor,
            paddingTop: '2%',
            maxHeight: 'auto',
          }}
        >
          <div>
            <h2
              style={{
                color: 'white',
                margin: 'auto',
                width: '50%',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              Seach lyrics of your favorite songs:
            </h2>
            <div style={{ margin: 'auto', width: '50%' }}>
              <SongDropdownSearch onSelectCallback={playSong} />
            </div>
            <h2 style={{ color: 'white', marginTop: '50px', marginLeft: '5%', fontSize: '21px' }}>
              20 last played songs:
            </h2>
            <div>{renderSongs(lastSongs)}</div>
          </div>
        </Content>
        {lastSongsLoadError !== '' ? (
          <Alert type="error" message={`An error has occured! (${lastSongsLoadError})`} banner />
        ) : (
          ''
        )}
      </Layout>

      <style jsx>{`
        .logoTitle {
          color: black;
          margin-left: 10px;
          font-size: large;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Home;
