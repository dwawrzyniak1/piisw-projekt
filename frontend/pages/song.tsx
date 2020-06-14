import React, { useEffect, useState } from 'react';
import Song from '../models/Song';
import NavigationBar from '../components/topBar/NavigationBar';
import { fetchSong } from '../requests/backend/fetchSong';
import { SongQuery, SongWithLyrics } from '../requests/backend/schema';
import { Button } from 'antd';
import { SongContainer } from '../components/song/SongContainer';
import { LyricsContainer } from '../components/song/LyricsContainer';
import { CaretRightOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons/lib';
import { getLastChosenSong } from '../utils/localStorage';
import { playSong } from '../requests/spotify/player';

const SongView: React.FC<void> = () => {
  const [songWithLyrics, setSongWithLyrics] = useState<SongWithLyrics>(null);
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
        spotifyPhotoUlr: exampleData.album.albumBigCoverUrl,
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
    </>
  );
};

export default SongView;
