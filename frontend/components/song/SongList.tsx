import React from 'react';
import { Card } from 'antd';
import { SongInternal } from '../../models/SongInternal';

interface SongListProps {
  songs: SongInternal[]
}

export const SongList: React.FC<SongListProps> = ({ songs }) => {
  const CARD_HEIGHT = '7.5em';
  // React has a problem with this as an inline style

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      {songs.map((song: SongInternal, index: number) => (
        <Card
          key={index}
          style={{
            marginBottom: '8px',
            maxHeight: '10%',
            border: 0,
            color: 'white',
            backgroundColor: '#333333',
          }}
          bodyStyle={{
            padding: 0,
          }}
        >
          <li>
            <div>
              <div>
                <img
                  src={song.photoUrl}
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
                      {song.artist}
                    </p>
                    <p
                      style={{
                        marginBottom: 0,
                        fontStyle: 'italic',
                        fontSize: '16px',
                      }}
                    >
                      {`${song.album} (${song.releaseYear}`}
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