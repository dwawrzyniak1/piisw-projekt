import React, { useEffect, useState } from 'react';
import Song from '../models/Song';
import NavigationBar from '../components/topBar/NavigationBar';
import { fetchSong } from '../requests/backend/song';
import { SongQuery } from '../requests/backend/schema';
import { Button } from 'antd';
import { SongContainer } from '../components/song/SongContainer';
import { LyricsContainer } from '../components/song/LyricsContainer';
import { CaretRightOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons/lib';
import { SongInternal } from '../models/SongInternal';
import Colors from '../constants/colors';
import Router from 'next/router';

import { fetchCheckedByUser, fetchUserFavourites, registerUser } from '../requests/backend/user';
import { getLastChosenSong, getUserId, setLastChosenSong } from '../utils/localStorage';
import { playSong, getNowPlaying } from '../requests/spotify/player';
import { fetchSpotify } from '../requests/spotify/fetchSpotify';

const SongView: React.FC<void> = () => {
  const [songWithLyrics, setSongWithLyrics] = useState<SongInternal>(null);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [checkedSong, setCheckedSong] = useState<Song>(null);

  useEffect(() => {
    if (checkedSong === null) {
      if (Router.query.now) {
        getNowPlaying().then(res => {
          setLastChosenSong(res[0]);
        });
      }
      const lastSong = getLastChosenSong();
      setSongWithLyrics(null);
      setErrorMessage('');
      const buildSongQuery = (): SongQuery => {
        return {
          username: getUserId(),
          song: {
            title: lastSong.title,
            artist: lastSong.artists[0],
            album: lastSong.album['title'],
            spotifyUri: lastSong.spotifyUri,
            photoUrl: lastSong.album.albumBigCoverUrl,
            releaseYear: Number(lastSong.album.releaseDate.split('-')[0]),
          },
        };
      };

      setCheckedSong(lastSong);

      fetchSong(buildSongQuery()).then(result => {
        if (result.status === 404) {
          setErrorMessage(
            "Unfortunetly we couldn't find lyrics for this song. Please try with other version if possible."
          );
        }
        if (result.status === 500) {
          setErrorMessage('Not cool. Number of this error is 500...');
        }
        if (typeof result === 'string') {
          setErrorMessage(result);
        } else {
          const { favourite, song } = result;
          setIsFavourite(favourite);
          setSongWithLyrics(song);
        }
      });
    }
  }, [JSON.stringify(checkedSong)]);

  return (
    <>
      <NavigationBar
        selectedMenuItem={4}
        dropdownSearchCallback={song => {
          setLastChosenSong(song);
          setCheckedSong(song);
        }}
      />
      <div className="song-view-container">
        <SongContainer backgroundUlr={checkedSong?.album.albumBigCoverUrl}>
          <div
            style={{
              position: 'absolute',
              left: 15,
              top: 5,
            }}
          >
            <h1 className="song-title">{checkedSong?.title}</h1>
            <h2 className="song-artist">{checkedSong?.artists[0]}</h2>
            <h3 className="song-album" style={checkedSong ? { opacity: 1 } : { opacity: 0 }}>
              {checkedSong?.album.title} ({checkedSong?.album.releaseDate.split('-')[0]})
            </h3>
          </div>

          <div className="song-operations">
            <Button
              className="song-button"
              shape="circle"
              size="large"
              icon={<CaretRightOutlined />}
              onClick={() => playSong(checkedSong)}
            />
            <Button
              className="song-button"
              shape="circle"
              size="large"
              style={{ marginLeft: 5 }}
              icon={isFavourite ? <HeartFilled /> : <HeartOutlined />}
            />
          </div>

          <LyricsContainer song={songWithLyrics} errorMessage={errorMessage} />
        </SongContainer>
      </div>

      <style jsx>{`
        .song-title {
          font-size: xx-large;
          font-weight: bold;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
        }

        .song-artist {
          font-size: x-large;
          font-weight: bold;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
        }

        .song-album {
          font-size: large;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
        }

        .song-operations {
          position: absolute;
          left: 15px;
          bottom: 15px;
        }

        .song-button {
          margin-left: 20px;
        }

        .song-view-container {
          position: relative;
          right: 50px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: ${Colors.backgroundColor};
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default SongView;
