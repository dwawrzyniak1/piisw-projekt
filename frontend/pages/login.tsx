import Router from 'next/router';
import { useEffect, useState } from 'react';

import { AUTH_ENDPOINT, CLIENT_ID } from '../constants/spotify';
import { APP_HOME_URL, APP_BASE_URL, APP_LOGIN_URL } from '../constants/urls';

const Login: React.FC = () => {
  const accessScopes = [
    'user-read-playback-state',
    'streaming',
    'playlist-read-collaborative',
    'user-modify-playback-state',
    'user-read-private',
    'user-top-read',
    'user-read-currently-playing',
    'playlist-read-private',
    'user-read-recently-played',
    'user-library-read',
  ]; // https://developer.spotify.com/documentation/general/guides/scopes/
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${APP_LOGIN_URL}&scope=${accessScopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;

  useEffect(() => {
    if (Router.query.error !== undefined) {
      Router.push(APP_BASE_URL.replace('http:', '')); // Router doesn't accept protocol
    } else if (Router.asPath.includes('access_token=')) {
      // Make a hook that extracts access_token, type and expiration date
      // (use Router.asPath for url)
      // example below
      // http://localhost:3000/home#access_token=<TOKEN>&token_type=Bearer&expires_in=3600
      Router.push(APP_HOME_URL.replace('http:', ''));
    } else Router.push(authUrl.replace('https:', ''));
  }, []);

  return <div></div>;
};

export default Login;
