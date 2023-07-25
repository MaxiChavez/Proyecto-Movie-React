import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { searchMoviesByFilter } from "../Services/apiCalls";
import "./Header.css";
import { getPeliculas } from "../Services/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addFindings } from "../Services/Slices/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //varuable de estado de el buscador
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState(message);

  const redirectPage = (page: string) => {
    switch (page) {
      case "Home":
        dispatch(addFindings({ findings: [] }));
        navigate("/");
        break;
      case "Top":
        dispatch(addFindings({ findings: [] }));
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

      // Obténgo la ruta actual desde la ubicación
      const currentPath = location.pathname;
      if (currentPath !== "/") {
        // Redirige al usuario a la página de inicio
        navigate("/");
      }
    } catch (error) {
      console.log("Error al traer las pelis:", error);
    }
  };
  //handler del buscador
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUpdated(message);
    search(message);
  };

  // const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  const keypressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search(message);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-secondary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand
          className="logo-brand"
          onClick={() => redirectPage("Home")}
        >
          MovieFinder
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
          <div>
            <input
              className="input-header"
              type="text"
              id="message"
              name="message"
              onChange={handleChange}
              onKeyDown={keypressHandler}
              value={message}
            />

            <Button
              variant="outline-dark"
              className="btn-header"
              onClick={handleClick}
            >
              Buscar
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
