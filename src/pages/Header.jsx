import {Container, Nav, Navbar, NavLink} from "react-bootstrap";

export const Header = () => {
    const {email} = JSON.parse(localStorage.getItem('user'));

    return (<Navbar className="ustify-content-between bg-body-tertiary mb-5">
            <Container>
                <Navbar.Brand href="#home">Asanner</Navbar.Brand>
                <Navbar.Text>{email}</Navbar.Text>
            </Container>
        </Navbar>
    )
}