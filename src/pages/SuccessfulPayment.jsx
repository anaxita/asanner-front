import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const SuccessfulPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/projects'), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <Alert variant="success">
          <Alert.Heading>Оплата прошла успешно</Alert.Heading>
          <hr />
          Через 5 секунд Вы попадете на главную
        </Alert>
      </div>
    </>
  );
};
