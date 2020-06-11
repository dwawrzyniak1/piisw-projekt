import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';
import _ from 'lodash';

import findSongs from '../../requests/spotify/findSongs';
import Song from '../../models/Song';

const searchResult = async (
  query: string
): Promise<[{ label: JSX.Element; value: string }[], string]> => {
  if (query.length === 0) {
    return [[], ''];
  }

  const [songs, error] = await findSongs(query);
  if (error !== '') {
    return [[], error];
  }
  return [
    songs.map((song: Song, index: number) => {
      const label = (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <b>{song.title}</b>
            <br />
            {` ${song.artists.join(', ')}`}
          </span>
          <span>
            <img src={song.album.albumSmallCoverUrl} width={48} />
          </span>
        </div>
      );

      return { label, value: `${song.title};${song.artists[0]}` };
    }),
    '',
  ];
};

const SongDropdownSearch = () => {
  const DEBOUNCE_DELAY = 700;

  const [options, setOptions] = useState<{ label: JSX.Element; value: string }[]>([]);
  const [error, setError] = useState('');

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  const handleSearch = _.debounce(async query => {
    const [foundSongs, searchError] = await searchResult(query);
    setOptions(foundSongs);
    setError(searchError);
  }, DEBOUNCE_DELAY);

  const errorNotice = [
    {
      label: (
        <div>
          <span style={{ color: 'red' }}>An error has occured! ({error})</span>
        </div>
      ),
      value: undefined,
    },
  ];
  return (
    <div>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 700,
        }}
        options={error ? errorNotice : options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search size="large" placeholder="Start typing song title..." enterButton />
      </AutoComplete>
    </div>
  );
};

export default SongDropdownSearch;
