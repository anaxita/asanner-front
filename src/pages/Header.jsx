import { Container, Dropdown, Navbar } from 'react-bootstrap';
import { List, StarFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const profile = localStorage.getItem('profile');

  let email;
  let subscription;

  profile ? ({ email, subscription } = JSON.parse(profile)) : '';

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    navigate('/login');
  };

  return (
    <Navbar className="justify-content-between bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/projects">Asanner</Navbar.Brand>
        {profile ? (
          <Navbar.Collapse className="justify-content-end">
            <Link className="btn btn-outline-primary  me-3" to="/projects">
              Мои проекты
            </Link>
            <div className="me-3">
              <Link to="/pricing" className="btn btn-outline-secondary">
                Тарифные планы
              </Link>
            </div>
            <div className="me-3">
              <Link to="/pricing" className={subscription?.price === 0 ? 'btn btn-secondary ' : 'btn btn-warning'}>
                <StarFill color="#fff" size={24} />
              </Link>
            </div>
            <Dropdown drop="start">
              <Dropdown.Toggle bsPrefix="p-0">
                <List size={37} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>{email}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logOut}>Выйти</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <div className="me-3">
              <Link to="/pricing" className="btn btn-outline-secondary">
                Тарифные планы
              </Link>
            </div>
            <a href={import.meta.env.VITE_ASANA_LOGIN_URL} className="btn btn-primary">
              Login with Asana
            </a>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
