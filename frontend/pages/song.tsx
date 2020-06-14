import React, { useEffect, useState } from 'react';
import Song from '../models/Song';
import NavigationBar from '../components/topBar/NavigationBar';
import { deleteFromFavourite, fetchSong, markAsFavourite } from '../requests/backend/song';
import { SongQuery } from '../requests/backend/schema';
import { Button } from 'antd';
import { SongContainer } from '../components/song/SongContainer';
import { LyricsContainer } from '../components/song/LyricsContainer';
import { CaretRightOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons/lib';
import { SongInternal } from '../models/SongInternal';
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

const SongView: React.FC<void> = () => {
  const [songWithLyrics, setSongWithLyrics] = useState<SongInternal>(null);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const songQuery: SongQuery = {
    username: 'Damian',
    song: {
      title: exampleData.title,
      artist: exampleData.artists[0],
      album: exampleData.album['title'],
      spotifyUri: exampleData.spotifyUri,
      photoUlr: exampleData.album.albumBigCoverUrl,
      releaseYear: parseInt(exampleData.album.releaseDate.split('-')[0]),
    },
  };

  useEffect(() => {
    deleteFromFavourite("Damian", 1)
      .then(result => {
        // if (typeof result === 'string') {
        //   setErrorMessage(result);
        // } else {
        //   const { favourite, song } = result;
        //   setIsFavourite(favourite);
        //   setSongWithLyrics(song);
        // }
        console.log(result);
      });
  }, []);

  return (
    <>
      <NavigationBar/>
      <div className='song-view-container'>
        <SongContainer backgroundUlr={exampleData.album.albumBigCoverUrl}>
          <div style={{
            position: 'absolute',
            left: 20,
            bottom: 0,
          }}>
            <h1 className='song-title'>{exampleData.title}</h1>
            <h2 className='song-artist'>{exampleData.artists[0]}</h2>
            <h3 className='song-album'>{exampleData.album.title} ({exampleData.album.releaseDate.split('-')[0]})</h3>
          </div>

          <div className='song-operations'>
            <Button className='song-button' shape='circle' size='large' icon={<CaretRightOutlined/>}/>
            <Button className='song-button' shape='circle' size='large' icon={isFavourite ? <HeartFilled/> : <HeartOutlined/>}/>
          </div>

          <LyricsContainer song={songWithLyrics} errorMessage={errorMessage}/>
        </SongContainer>
      </div>

      <style jsx>{`
        .song-title {
          font-size: xx-large;
          font-weight: bold;
          color: white;
        }
        
        .song-artist {
          font-size: x-large;
          font-weight: bold;
          color: white;
        }
        
        .song-album {
          font-size: large;
          color: white;
        }
        
        .song-operations {
          position: absolute;
          right: 15px;
          top: 50px;
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