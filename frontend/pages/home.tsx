import React, { useEffect, useState } from 'react';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import Song from '../models/Song';
import { playSong } from '../requests/spotify/player';
import SongDropdownSearch from '../components/searching/SongDropdownSearch';
import { Layout, Table, Card } from 'antd';
import Colors from '../constants/colors';

const Home: React.FC = () => {
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
        <div
          style={{
            width: '90%',
            margin: 'auto',
            color: 'white',
            backgroundColor: Colors.backgroundColor,
            fontSize: '17px',
            fontWeight: 'bold',
            marginTop: '2%',
          }}
        >
          <span style={{ marginLeft: '10%' }}>Title</span>
          <span style={{ left: '46%', position: 'absolute' }}>Artist</span>
          <span style={{ left: '71%', position: 'absolute' }}>Album</span>
        </div>
        {songs.map((song: Song, index: number) => (
          <Card
            style={{
              backgroundColor: Colors.footerColor,
              marginBottom: '8px',
              maxHeight: '10%',
            }}
          >
            <li key={index}>
              <div style={{}}>
                <img
                  src={song.album.albumSmallCoverUrl}
                  style={{
                    marginRight: '3%',
                    float: 'left',
                    width: '7%',
                    height: '7%',
                  }}
                ></img>
                <span
                  style={{
                    float: 'left',
                    verticalAlign: 'middle',
                    fontSize: '17px',
                    fontWeight: 'bold',
                    maxWidth: '30%',
                    textOverflow: 'ellipsis',
                    lineHeight: '4.5',
                    minHeight: '65px',
                  }}
                >
                  {song.title}
                </span>
                <p
                  style={{
                    marginRight: '3%',
                    marginLeft: '7%',
                    float: 'left',
                    lineHeight: '4.5',
                    textAlign: 'left',
                    fontSize: '16px',
                    left: '38%',
                    position: 'absolute',
                    maxWidth: '30%',
                  }}
                >
                  {song.artists.join(', ')}
                </p>
                <span
                  style={{
                    float: 'left',
                    lineHeight: '4.5',
                    left: '75%',
                    maxWidth: '30%',
                    position: 'absolute',
                    fontSize: '16px',
                    overflow: 'hidden',
                  }}
                >
                  {song.album.title}
                </span>
              </div>
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
              <SongDropdownSearch />
            </div>
            <h2 style={{ color: 'white', marginTop: '50px', marginLeft: '5%', fontSize: '21px' }}>
              20 last played songs:
            </h2>
            <div>
              {renderSongs(lastSongs)}
              {lastSongsLoadError !== '' ? <p>Error: {lastSongsLoadError}</p> : ''}
            </div>
          </div>
        </Content>
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
