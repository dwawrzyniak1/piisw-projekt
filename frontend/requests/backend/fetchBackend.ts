import { BACKEND_BASE_URL } from '../../constants/urls';

export const fetchBackend = (path: string, method: string, body?: object): Promise<Response> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  console.log(JSON.stringify(body));

  return fetch(`${BACKEND_BASE_URL}${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });
};