import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle, PersonSquare, StarFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

import './index.css';

export const Header = () => {
  const navigate = useNavigate();

  const profile = localStorage.getItem('profile');

  let email, name, picture;

  profile ? ({ email, name, picture } = JSON.parse(profile)) : '';

  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Navbar className="justify-content-between border-bottom">
      <Container>
        <Navbar.Brand href="/projects">Asanner</Navbar.Brand>
        {profile ? (
          <Navbar.Collapse className="justify-content-end">
            <Link className="btn btn-outline-primary me-3" to="/projects">
              Мои проекты
            </Link>
            <Link className="btn btn-outline-warning " to="/support">
              Поддержка
            </Link>
            <div className="me-3">
              {/* <Link  to="/pricing" className="btn btn-outline-secondary">
                Тарифные планы
              </Link> */}
            </div>
            {/* <div className="me-3">
              <Link to="/pricing" className={subscription?.price === 0 ? 'btn btn-secondary ' : 'btn btn-warning'}>
                <StarFill color="#fff" size={24} />
              </Link>
            </div> */}
            <Dropdown drop="start">
              <Dropdown.Toggle bsPrefix="p-0" variant="dark" className="bg-transparent border-0">
                {picture ? (
                  <img
                    src={picture}
                    alt="avatar"
                    className="rounded-circle object-fit-cover"
                    style={{ width: '37px', height: '37px' }}
                  />
                ) : (
                  <PersonCircle size={37} />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item>{name ? name : email}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logOut}>Выйти</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Nav>
              <NavDropdown title={<PersonCircle size={37} />} menuVariant="light" drop="start">
                <NavDropdown.Item>{name ? name : email}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>Выйти</NavDropdown.Item>
              </NavDropdown>
            </Nav> */}
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <div className="me-3">
              {/* <Link  to="/pricing" className="btn btn-outline-secondary">
                Тарифные планы
              </Link> */}
            </div>
            <Link className="btn btn-outline-warning me-3" to="/support">
              Поддержка
            </Link>
            <a href={import.meta.env.VITE_ASANA_LOGIN_URL} className="btn btn-primary">
              Войти через Asana
            </a>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
