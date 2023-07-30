import {Container, Navbar} from "react-bootstrap";

export const Header = () => {
    const {email} = JSON.parse(localStorage.getItem('user'));

    return (<Navbar className="bg-body-tertiary mb-5">
            <Container>
                <Navbar.Brand href="#home">Asanner</Navbar.Brand>
                <Navbar.Text>
                    {email}
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}