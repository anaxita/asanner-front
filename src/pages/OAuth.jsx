import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { makeHttpRequest } from '../api/makeHttpRequest';

// OAuth component that handles the OAuth flow with Asana and redirects to the projects page when complete
export const OAuth = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) {
    navigate('/login');
  }

  useEffect(() => {
    makeHttpRequest('POST', `/login?code=${code}`).then((r) => {
      const { data, error } = r;
      if (error) {
        console.log(error);
      } else {
        const { access_token, refresh_token, user } = data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('profile', JSON.stringify(user));
        navigate('/projects');
      }
    });
  }, [code]);

  return (
    <div className="bg-light vh-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Авторизация...</span>
      </Spinner>
    </div>
  );
};
