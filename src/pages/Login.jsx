import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';

import { setItemToStore } from '../utils/setItemToStore';

export const Login = () => {
  const API_URL = 'https://dev.api.asanner.anaxita.ru';
  const location = useLocation();

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

  useEffect(() => {
    if (location.state && location.state.fromLink) {
      login();
    }
  }, [location.state]);

  return (
    <>
      <div className="login">
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Link
            to="https://app.asana.com/-/oauth_authorize?response_type=code&client_id=1205061770281429&redirect_uri=https%3A%2F%2Fb449-91-226-138-49.ngrok-free.app%2Fprojects&scope=openid email default"
            className="btn btn-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
