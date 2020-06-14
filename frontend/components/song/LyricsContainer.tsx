import React from 'react';
import { SongWithLyrics } from '../../requests/backend/schema';
import FullscreenSpinner from '../loading/FullscreenSpinner';

interface LyricsProps {
  song: SongWithLyrics,
  errorMessage?: string
}

export const LyricsContainer: React.FC<LyricsProps> = props => {
  const { song, errorMessage } = props;

  let content;
  if (errorMessage !== '') {
    content = errorMessage;
  } else if (song == null) {
    content = <FullscreenSpinner/>
  } else {
    content = <p>{song.lyrics}</p>;
  }

  return (
    <>
      <div className='lyrics-container'>
        {content}
      </div>

      <style jsx>{`
        .lyrics-container {
          height: 600px;
          width: 400px;
          background-color: white;
          z-index: 1;
          position: relative;
          left: 300px;
          top: 100px;
          -webkit-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
          -moz-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
           box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
};