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
      const { data, err } = r;
      if (err) {
        console.log(err);
      } else {
        const { access_token } = data;
        localStorage.setItem('token', access_token);
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
