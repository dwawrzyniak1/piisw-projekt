import React, { useEffect, useState } from 'react';
import Song from '../../models/Song';

const get20lastPlayedSongs = async (
  accessToken: string,
  tokenType: string
): Promise<[Song[], string]> => {
  let errorMessage = '';
  const songs: Song[] = [];

  const requestHeaders: any = {
    'Content-Type': 'application/json',
    Authorization: `${tokenType} ${accessToken}`,
  };
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
    method: 'GET',
    headers: requestHeaders,
  });
  if (response.status !== 200) {
    errorMessage = response.statusText;
    return [songs, errorMessage];
  }

  const data = await response.json();
  data.items.forEach((item: { track: any }) => {
    const track = item.track;

    const title = track.name;
    const artists = track.artists.map((artist: { name: string }) => artist.name);
    const album = track.album.name;
    const albumBigCoverUrl = track.album.images[0].url;
    const albumMediumCoverUrl = track.album.images[1].url;
    const albumSmallCoverUrl = track.album.images[2].url;
    songs.push({
      title,
      artists,
      album,
      albumBigCoverUrl,
      albumMediumCoverUrl,
      albumSmallCoverUrl,
    });
  });

  return [songs, errorMessage];
};

export default get20lastPlayedSongs;
