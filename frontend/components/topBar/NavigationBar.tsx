import React from 'react';
import { Layout, Menu } from 'antd';
import Colors from '../../constants/colors';
import { playSong } from '../../requests/spotify/player';
import SongDropdownSearch from '../../components/searching/SongDropdownSearch';

type Props = { selectedMenuItem: number };
const NavigationBar = ({ selectedMenuItem }: Props): JSX.Element => {
  const SELECTED_MENU_ITEM_STYLE = { color: 'white', borderColor: 'white' };

  const { Header } = Layout;

  return (
    <div>
      <Header
        style={{
          width: '100%',
          backgroundColor: Colors.primaryColor,
          height: '67px',
        }}
      >
        <div
          className="logo"
          style={{
            maxWidth: '160px',
            float: 'left',
          }}
        >
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
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[selectedMenuItem.toString()]}
          style={{
            backgroundColor: Colors.primaryColor,
            marginLeft: '140px',
            maxWidth: '330px',
            float: 'left',
          }}
        >
          <Menu.Item key={1} style={selectedMenuItem === 1 ? SELECTED_MENU_ITEM_STYLE : {}}>
            Last played
          </Menu.Item>
          <Menu.Item
            key={2}
            style={selectedMenuItem === 2 ? SELECTED_MENU_ITEM_STYLE : {}}
            color="red"
          >
            Favorites
          </Menu.Item>
          <Menu.Item key={3} style={selectedMenuItem === 3 ? SELECTED_MENU_ITEM_STYLE : {}}>
            Statistics
          </Menu.Item>
        </Menu>
        <div style={{ marginLeft: '200px', float: 'left' }}>
          <SongDropdownSearch onSelectCallback={playSong} />
        </div>
      </Header>
      {/*<div>*/}
      {/*  <h2*/}
      {/*    style={{*/}
      {/*      color: 'white',*/}
      {/*      margin: 'auto',*/}
      {/*      width: '50%',*/}
      {/*      textAlign: 'center',*/}
      {/*      marginBottom: '10px',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Seach lyrics of your favorite songs:*/}
      {/*  </h2>*/}
      {/*</div>*/}

      <style jsx>{`
        .logoTitle {
          color: black;
          margin-left: 10px;
          font-size: large;
          font-weight: bold;
        }

        :global(.ant-menu-item) {
          color: black;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default NavigationBar;
