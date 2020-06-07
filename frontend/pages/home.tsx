import {
  getAccessToken,
  getTokenType,
  getTokenExpirationTime,
} from '../utils/localStorage';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [token, setToken] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);

  useEffect(() => {
    setToken(getAccessToken());
    setTokenType(getTokenType());
    setTokenExpirationTime(getTokenExpirationTime());
  }, []);

  return (
    <div>
      <h1>Welcome home</h1>
      <p>Token: {token}</p>
      <p>Token type: {tokenType}</p>
      <p>Expiration time: {tokenExpirationTime}</p>
    </div>
  );
};

export default Home;
