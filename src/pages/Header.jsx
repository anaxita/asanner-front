import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Header = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));

  return (
    <Navbar className="justify-content-between bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Asanner</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Link className="btn btn-outline-primary  me-3" to="/projects">
            Мои проекты
          </Link>
          <div className="me-3">
            <Link
              to="/pricing"
              className={profile?.subscription?.name === 'Basic' ? 'btn btn-secondary ' : 'btn btn-warning'}
            >
              {profile?.subscription?.name === 'Basic' ? 'Базовый тариф ' : 'Премиум тариф'}
            </Link>
          </div>
          <Navbar.Text>{profile?.email}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
