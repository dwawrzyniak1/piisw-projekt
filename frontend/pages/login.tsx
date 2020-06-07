import Router from 'next/router';
import { useEffect } from 'react';

import { AUTH_ENDPOINT, CLIENT_ID } from '../constants/spotify';
import { APP_HOME_URL, APP_BASE_URL, APP_LOGIN_URL } from '../constants/urls';
import { extractAuthDataFromUrl } from '../utils/url';
import { saveToLocalStorage, getAccessToken } from '../utils/localStorage';
import FullscreenSpinner from '../components/loading/FullscreenSpinner';

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
      saveToLocalStorage(extractAuthDataFromUrl(Router.asPath));
      getAccessToken() !== undefined &&
        Router.push(APP_HOME_URL.replace('http:', ''));
    } else {
      Router.push(authUrl.replace('https:', ''));
    }
  }, []);

  return <FullscreenSpinner />;
};

export default Login;
