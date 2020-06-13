import React from 'react';
import { Layout } from 'antd';
import Colors from '../../constants/colors';
import { playSong } from '../../requests/spotify/player';
import SongDropdownSearch from '../../components/searching/SongDropdownSearch';

const NavigationBar = (): JSX.Element => {
  const { Header } = Layout;

  return (
    <div>
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
      </div>

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

export default NavigationBar;
