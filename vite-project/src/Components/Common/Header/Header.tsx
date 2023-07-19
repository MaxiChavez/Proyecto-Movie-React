import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { searchMoviesByFilter } from "../Services/apiCalls";
import "./Header.css";
import { getPeliculas } from "../Services/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addFindings, deleteFindings } from "../Services/Slices/searchSlice";
import { redirect, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirectPage = (page: string) => {
    switch (page) {
      case "Home":
        dispatch(deleteFindings({ findings: [] }));
        navigate("/");
        break;
      case "Top":
        dispatch(deleteFindings({ findings: [] }));
        navigate("/top");
        break;
      default:
        break;
    }
  };

  const search = async (busqueda: string) => {
    try {
      if (busqueda == "") {
        const peliculas = await getPeliculas();
        dispatch(addFindings({ findings: peliculas }));
        console.log("Hago dispatch y agrego []");
      } else {
        const peliculas = await searchMoviesByFilter(busqueda);
        dispatch(addFindings({ findings: peliculas }));
        console.log("Hago dispatch y agrego []");
      }

      // Obtén la ruta actual desde la ubicación
      const currentPath = location.pathname;
      if (currentPath !== "/") {
        // Redirige al usuario a la página de inicio
        navigate("/");
      }
    } catch (error) {
      console.log("Error al traer las pelis:", error);
    }
  };

  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState(message);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClick = () => {
    setUpdated(message);
    search(message);
  };

  return (
    <Navbar expand="lg" className="bg-body-secondary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand
          className="logo-brand"
          onClick={() => redirectPage("Home")}
        >
          Pelis-Max
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => redirectPage("Top")}>Top 20</Nav.Link>
            <Nav.Link href="../">Peliculas</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <input
              type="text"
              id="message"
              name="message"
              onChange={handleChange}
              value={message}
            />

            <Button variant="outline-dark" onClick={handleClick}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
