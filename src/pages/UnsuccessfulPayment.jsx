import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const UnsuccessfulPayment = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <Alert variant="danger">
        <Alert.Heading>Упс... ошибка</Alert.Heading>
        <p>Произошла непредвиденная ошибка. Повторите попытку.</p>
        <hr />
        <div className="d-flex justify-content-between">
          <Link className="btn btn-success  me-3" to="/pricing">
            Повторить оплату
          </Link>
          <Link className="btn btn-outline-danger  me-3" to="/projects">
            Мои проекты
          </Link>
        </div>
      </Alert>
    </div>
  );
};
