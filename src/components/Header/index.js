import { Container, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/clientes">Instaltec</Navbar.Brand>
          <Navbar.Text>
            Contato: <a href="tel:981093897">981093897</a>
          </Navbar.Text>
        </Container>
      </Navbar>
  );
}
export default Header;
