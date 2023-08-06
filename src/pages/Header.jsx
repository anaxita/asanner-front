import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { email, is_premium } = JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar className="justify-content-between bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Asanner</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Link className="btn btn-outline-primary  me-3" to="/projects">
            Мои проекты
          </Link>
          <div className="me-3">
            <Link to="/pricing" className={is_premium ? 'btn btn-warning' : 'btn btn-secondary'}>
              {is_premium ? 'Премиум тариф' : 'Базовый тариф'}
            </Link>
          </div>
          <Navbar.Text>{email}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
