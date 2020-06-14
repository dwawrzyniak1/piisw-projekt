import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/topBar/NavigationBar';
import { Bar } from 'react-chartjs-2';
import colors, { chartColors } from '../constants/colors';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import Song from '../models/Song';

const Popular: React.FC = () => {
  const FONT_COLOR = 'rgba(255, 255, 255, 0.9)';
  const GRID_COLOR = 'rgba(255, 255, 255, 0.2)';

  const [lastSongs, setLastSongs] = useState<Song[]>([]);
  const [lastSongsLoadError, setLastSongsLoadError] = useState<string>('');
  useEffect(() => {
    (async () => {
      loadRecentSongsInfo();
    })();
  }, []);

  const loadRecentSongsInfo = async () => {
    const [loadedSongs, error] = await get20lastPlayedSongs();
    const loadedSongsPrepared = loadedSongs.slice(0, 5); // SORTING
    setLastSongs(loadedSongsPrepared);
  };

  const data = {
    labels: lastSongs.map(s => s.title),
    datasets: [
      {
        data: lastSongs.map((s, i) => i + 2 * 3),
        backgroundColor: chartColors.backgroundColor,
        borderColor: chartColors.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options: Chart.ChartOptions = {
    title: {
      display: true,
      position: 'top',
      text: 'Most checked out songs:',
      fontColor: FONT_COLOR,
      fontSize: 17,
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true, fontColor: FONT_COLOR },
          gridLines: { color: GRID_COLOR },
        },
      ],
      xAxes: [
        {
          ticks: { fontColor: FONT_COLOR },
          gridLines: { color: GRID_COLOR },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: v => {
          const tooltipSong: Song = lastSongs.filter(song => {
            // return song.timesChecked === Number(v[0].value) && song.title === v[0].label;
            return song.title === v[0].label;
          })[0];
          return [tooltipSong.title, tooltipSong.artists[0], '', tooltipSong.album.title];
        },
      },
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      bodyFontColor: colors.backgroundColor,
      titleFontColor: colors.backgroundColor,
      multiKeyBackground: colors.backgroundColor,
    },
  };

  return (
    <body style={{ backgroundColor: colors.backgroundColor }}>
      <div>
        <NavigationBar />
        <div style={{ margin: '4em' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </body>
  );
};

export default Popular;
