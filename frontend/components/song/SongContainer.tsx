import React from 'react';

interface ContainerProps {
  backgroundUlr: string
}

export const SongContainer: React.FC<ContainerProps> = props => {
  const { backgroundUlr, children } = props;
  return (
    <>
      <div className='song-container'>
        {children}
      </div>

      <style jsx>{`
        .song-container {
          height: 600px;
          width: 600px;
          margin: auto;
          
          display: block;
          position: relative;
          
          background-image: url(${backgroundUlr});
          
          -webkit-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
          -moz-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
           box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
        }
        .song-container::before {
          content: "";
          background-color: rgba(100, 95, 94, 0.75);
          height: 100%;
          width: 100%;
          position: absolute;
        }
      `}</style>
    </>
  );
};


// .song-container::after {
//   content: "";
//   background-image: url(${backgroundUlr});
//   opacity: 0.5;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   position: absolute;
//   z-index: -1;
//