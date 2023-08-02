import { Button, Container, Navbar } from 'react-bootstrap';

export const Header = () => {
  const { email, is_premium } = JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar className="ustify-content-between bg-body-tertiary mb-5">
      <Container>
        <Navbar.Brand href="#home">Asanner</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button className="me-3" variant={is_premium ? 'warning' : 'secondary'}>
            {is_premium ? 'Премиум тариф' : 'Базовый тариф'}
          </Button>
          <Navbar.Text>{email}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
