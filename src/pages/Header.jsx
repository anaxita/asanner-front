import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle, PersonSquare, StarFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const profile = localStorage.getItem('profile');

  let email, name, picture;

  profile ? ({ email, name, picture } = JSON.parse(profile)) : '';

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    navigate('/login');
  };

  return (
    <Navbar className="justify-content-between bg-body-tertiary border-bottom">
      <Container>
        <Navbar.Brand href="/projects">Asanner</Navbar.Brand>
        {profile ? (
          <Navbar.Collapse className="justify-content-end">
            <Link className="btn btn-outline-primary " to="/projects">
              Мои проекты
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
              <Dropdown.Toggle
                bsPrefix="p-0"
                variant="light"
                style={{ border: 'unset !important', backgroundColor: 'unset !important' }}
              >
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

              <Dropdown.Menu>
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
            <a href={import.meta.env.VITE_ASANA_LOGIN_URL} className="btn btn-primary">
              Войти через Asana
            </a>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
