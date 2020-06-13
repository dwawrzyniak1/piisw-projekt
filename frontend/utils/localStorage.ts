import { ACCESS_TOKEN_KEY, TOKEN_TYPE_KEY, EXPIRES_IN_KEY } from '../constants/auth';
import { USER_ID_KEY } from '../constants/spotify';

export const saveToLocalStorage = (obj: object): void => {
  Object.keys(obj).forEach(key => localStorage.setItem(key, obj[key]));
};

export const getAccessToken = (): string | undefined => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getTokenType = (): string | undefined => {
  return localStorage.getItem(TOKEN_TYPE_KEY);
};

export const getTokenExpirationTime = (): number | undefined => {
  return Number(localStorage.getItem(EXPIRES_IN_KEY));
};

export const getUserId = (): string | undefined => {
  return localStorage.getItem(USER_ID_KEY);
};
