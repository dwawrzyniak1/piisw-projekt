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

import { fetchCheckedByUser, fetchUserFavourites, registerUser } from '../requests/backend/user';

const exampleData: Song = {
  album: {
    albumBigCoverUrl: 'https://i.scdn.co/image/ab67616d0000b273c4fc80e7cb3993d03ea4899a',
    albumMediumCoverUrl: 'https://i.scdn.co/image/ab67616d00001e02c4fc80e7cb3993d03ea4899a',
    albumSmallCoverUrl: 'https://i.scdn.co/image/ab67616d00004851c4fc80e7cb3993d03ea4899a',
    releaseDate: '2020-03-07',
    title: 'Art Brut 2',
  },
  artists: ['Dawid Podsiadło'],
  popularity: 57,
  spotifyUri: 'spotify:track:6KMvWbvvvD205ZhvXmjxVr',
  title: 'Dżins',
};
import { getLastChosenSong } from '../utils/localStorage';
import { playSong } from '../requests/spotify/player';

const SongView: React.FC<void> = () => {
  const [songWithLyrics, setSongWithLyrics] = useState<SongInternal>(null);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [checkedSong, setCheckedSong] = useState<Song>(null);

  useEffect(() => {
    const exampleData = getLastChosenSong();

    const songQuery: SongQuery = {
      username: 'Damian',
      song: {
        title: exampleData.title,
        artist: exampleData.artists[0],
        album: exampleData.album['title'],
        spotifyUri: exampleData.spotifyUri,
        photoUrl: exampleData.album.albumBigCoverUrl,
        releaseYear: Number(exampleData.album.releaseDate.split('-')[0]),
      },
    };

    setCheckedSong(exampleData);

    fetchSong(songQuery).then(result => {
      console.log(result);
      if (result.status === 404) {
        setErrorMessage(
          "Unfortunetly we couldn't find lyrics for this song. Please try with other version if possible."
        );
      }
      if (typeof result === 'string') {
        setErrorMessage(result);
      } else {
        const { favourite, song } = result;
        setIsFavourite(favourite);
        setSongWithLyrics(song);
      }
    });
  }, []);

  return (
    <>
      <NavigationBar selectedMenuItem={4} />
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
            <h3 className="song-album">
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
