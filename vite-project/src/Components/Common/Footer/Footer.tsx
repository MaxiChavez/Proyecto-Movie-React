import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <Navbar expand="lg" className="bg-body-secondary" data-bs-theme="dark">
      <Container fluid className="justify-content-center py-2">
        <Navbar.Brand className="logo-brand">Maxi Chavez - 2023</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
