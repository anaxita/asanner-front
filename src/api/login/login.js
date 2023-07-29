import axios from 'axios';

import { getItemFromStore } from '../../utils/getItemFromStore';
import { setItemToStore } from '../../utils/setItemToStore';

const API_URL = 'https://dev.api.asanner.anaxita.ru';

const login = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/login?code=${code}`, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

    console.log('response: ', response);

    const { access_token } = response.data;

    setItemToStore('accessToken', access_token);
  } catch (error) {
    console.error('Ошибка авторизации:', error);
  }
};

// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');

//     const response = await axios.post('/refresh-token', { refreshToken });

//     const { accessToken } = response.data;

//     localStorage.setItem('accessToken', accessToken);
//   } catch (error) {
//     console.error('Ошибка обновления access token:', error);
//   }
// };

export const addAccessTokenToHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       await refreshAccessToken();

//       // return axios.request(error.config);
//     }
//     return Promise.reject(error);
//   },
// );

export const checkAuthorization = () => {
  login();
  const accessToken = getItemFromStore('accessToken');

  if (!accessToken) {
    window.location.href = '/login';
  }
};

export const isAccessTokenExpired = () => {
  const accessToken = getItemFromStore('accessToken');
  if (accessToken) {
    const decodedToken = decodeToken(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }
  return true;
};

const decodeToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  return payload;
};

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    login(code);
  }
});
