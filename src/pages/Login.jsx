import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { setItemToStore } from '../utils/setItemToStore';

export const Login = () => {
  const API_URL = 'http://localhost:8088';
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(
      'https://app.asana.com/-/oauth_authorize?response_type=code&client_id=1205061770281429&redirect_uri=https%3A%2F%2Fc1c2-91-226-138-49.ngrok-free.app%2Fprojects&scope=openid email default',
    ); // Переходим на новую страницу
    login(); // Выполняем функцию login()
  };

  const login = async (code) => {
    try {
      const response = await axios.post(`${API_URL}/login?code=${code}`, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });

      console.log('response: ', response);

      const { access_token, refresh_token } = response.data;

      setItemToStore('accessToken', access_token);
      setItemToStore('refreshToken', refresh_token);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <>
      <div className="login">
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Button className="btn btn-primary" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
