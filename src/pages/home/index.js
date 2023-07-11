import './index.sass';
import './index.pug';

import axios from 'axios';

const API_URL = 'https://083f-31-146-221-63.ngrok-free.app';

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const code = urlParams.get('code');

axios.post(`${API_URL}/auth?code=${code}`, {
  headers: { 'Access-Control-Allow-Origin': '*' },
});

setTimeout(() => {
  axios.post(`${API_URL}/projects`).then((res) => console.log('res: ', res));
}, 3000);

export default () => {};
