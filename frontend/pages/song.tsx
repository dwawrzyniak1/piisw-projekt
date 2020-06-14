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
import { getLastChosenSong, getUserId, setLastChosenSong } from '../utils/localStorage';
import { playSong } from '../requests/spotify/player';
import { fetchSpotify } from '../requests/spotify/fetchSpotify';

const SongView: React.FC<void> = () => {
  const [songWithLyrics, setSongWithLyrics] = useState<SongInternal>(null);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [checkedSong, setCheckedSong] = useState<Song>(null);

  useEffect(() => {
    const lastSong = getLastChosenSong();
    setSongWithLyrics(null);
    setErrorMessage('');
    const buildSongQuery = (song: Song): SongQuery => {
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

    const example = {
      username: getUserId(),
      song: {
        id: 26,
        title: 'Rust in Peace...Polaris',
        artist: 'Megadeth',
        album: 'string',
        photoUrl: 'string',
        spotifyUri: 'string',
        releaseYear: 0,
        lyrics: "[Rust in Peace]\n\n[Verse 1]\nTremble, you weaklings, cower in fear\nI am your ruler - land, sea, and air\nImmense in my girth, erect I stand tall\nI am a nuclear murderer, I am Polaris\nReady to pounce at the touch of a button\nMy system's locked in for military gluttons\nI rule on land, air, and sea\nI pass judgment on humanity\nWinds blow from the bowels of Hell\nWill we give warning? Only time will tell\nSatan rears his ugly head\nTo spit into the wind\n\n[Chorus]\nI spread disease like a dog, discharge my payload\nA mile high, rotten egg air of death wrestles your nostrils\nI spread disease like a dog, discharge my payload\nA mile high, rotten egg air of death wrestles your nostrils\nLaunch the Polaris\nThe end doesn't scare us\nWhen will this cease?\nThe warheads will all rust in peace\n\n[Verse 2]\nBomb shelters filled to the brim\nHeh, survival, such a silly whim\nWorld leaders sell missiles cheap\nYour stomach turns, your flesh creeps\nI rule land, air, and sea\nPass judgment on humanity\nWinds blow from the bowels of Hell\nWill we give warning? Well only time will tell\n\n[Chorus]\nI spread disease like a dog, discharge my payload\nA mile high, rotten egg air of death wrestles your nostrils\nI spread disease like a dog, discharge my payload\nA mile high, rotten egg air of death wrestles your nostrils\nLaunch the Polaris\nThe end doesn't scare us\nWhen will this cease?\nThe warheads will all rust in peace\n\n[Verse 3]\nHigh priest of holocaust, fire from the sea\nNuclear winter, spreading disease\nThe day of final conflict, all pay the price\nThe third world war rapes peace, takes life\nBack to the start, die in the pyre\nWhen the Earth was cold as ice\nTotal dismay as the sun passed away\nAnd the days were black as night\n\n[Chorus]\nI spread disease like a dog, discharge my payload\nA mile high, rotten egg air of death wrestles your nostrils\nI spread disease like a dog, discharge my payload\nA mile high, rotten egg air of death wrestles your nostrils\nLaunch the Polaris\nIt doesn't scare us\nWhen will this cease?\nThe warheads will all rust in peace\n\n[Polaris]\n\n[Outro]\nEradication of\nEarth's population loves Polaris\nEradication of\nEarth's population loves Polaris\n\n[Instrumental]\n\nEradication of\nEarth's population loves Polaris\nEradication of\nEarth's population loves Polaris"
      },
      errorMessage: null,
      favourite: false
    };

    setCheckedSong(lastSong);

    // fetchSong(buildSongQuery(checkedSong)).then(result => {
    //   if (result.status === 404) {
    //     setErrorMessage(
    // tslint:disable-next-line:max-line-length
    //       "Unfortunetly we couldn't find lyrics for this song. Please try with other version if possible."
    //     );
    //   }
    //   if (result.status === 500) {
    //     setErrorMessage('Not cool. Number of this error is 500...');
    //   }
    //   if (typeof result === 'string') {
    //     setErrorMessage(result);
    //   } else {
    //     const { favourite, song } = result;
    //     setIsFavourite(favourite);
    //     setSongWithLyrics(song);
    setSongWithLyrics(example.song);
    //   }
    // });
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
      <div  style={{ marginTop: '20px' }} className="song-view-container">
        <SongContainer backgroundUlr={checkedSong?.album.albumBigCoverUrl}>
          <div
            style={{
              position: 'absolute',
              left: 15,
              top: 5,
            }}
          >
            <span className="song-title">{checkedSong?.title}</span>
            <span className="song-artist">{checkedSong?.artists[0]}</span>
            <span className="song-album" style={checkedSong ? { opacity: 1 } : { opacity: 0 }}>
              {checkedSong?.album.title} ({checkedSong?.album.releaseDate.split('-')[0]})
            </span>
          </div>

          <div className="song-operations">
            <Button
              className="song-button"
              shape="circle"
              size="large"
              style={{ boxShadow: '2px 2px 6px #181818' }}
              icon={<CaretRightOutlined />}
              onClick={() => playSong(checkedSong)}
            />
            <Button
              className="song-button"
              shape="circle"
              size="large"
              style={{ marginLeft: 12, boxShadow: '2px 2px 6px #181818' }}
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
          display: block;
          text-shadow: 2px 2px 6px #181818;
        }

        .song-artist {
          font-size: x-large;
          font-weight: bold;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
          display: block;
          text-shadow: 2px 2px 6px #181818;
        }

        .song-album {
          font-size: large;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
          display: block;
          text-shadow: 2px 2px 6px #181818;
          font-style: italic;
        }

        .song-operations {
          position: absolute;
          left: 15px;
          bottom: 15px;
        }

        .song-button {
          margin-left: 20px;
        }

        :global(.ant-btn:hover) {
          color: white;
          background-color: #1db954;
          border-color: #737373;
        }

        :global(.ant-btn:focus) {
          color: white;
          background-color: #1db954;
          border-color: #737373;
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
