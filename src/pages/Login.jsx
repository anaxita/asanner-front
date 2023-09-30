import { Card } from 'react-bootstrap';
import { Calendar2, CheckCircle, PersonCircle } from 'react-bootstrap-icons';

import { Header } from './Header';
import './login.css';

// Login component that redirects to Asana's OAuth flow
export const Login = () => {
  return (
    <>
      <Header />
      <div className="login vh-100 vw-100 d-flex justify-content-center align-items-center flex-column align-items-center">
        <h1 className="text-white">Assaner</h1>
        <p className="text-white fs-4">Добавьте вашим задачам понятный ID</p>
        <div className="d-flex gap-3 justify-content-center">
          <Card className="mb-2 col-5">
            <Card.Header>
              <CheckCircle /> Отправить отчёт
            </Card.Header>
            <Card.Body>
              <Card.Text>На почту в экселе.</Card.Text>
              <PersonCircle size={24} className="me-3" />
              <Calendar2 size={24} />
            </Card.Body>
          </Card>
          <Card className="mb-2 col-5">
            <Card.Header>
              <CheckCircle /> <b>T-3</b> Отправить отчёт
            </Card.Header>
            <Card.Body>
              <Card.Text>На почту в экселе.</Card.Text>
              <PersonCircle size={24} className="me-3" />
              <Calendar2 size={24} />
            </Card.Body>
          </Card>
        </div>

        <a href={import.meta.env.VITE_ASANA_LOGIN_URL} className="btn btn-primary btn-lg text-center">
          Войти через Asana
        </a>
      </div>
    </>
  );
};
