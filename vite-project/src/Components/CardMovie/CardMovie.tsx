import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMovie } from "../Common/Services/Slices/detailSlice";
import "./CardMovie.css";

interface IMovieProps {
  id: string;
  title: string;
  overview: string;
  image: string;
}

export const CardMovie = (movie: IMovieProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seeDetail = () => {
    //Primero guardo en RDX los datos del personaje en concreto...
    dispatch(addMovie({ movie: movie }));

    //A continuación voy a la página de detalle de ese personaje...
    navigate("/detail");
  };

  return (
    <div className="container">
      <Card key={movie.id} style={{ width: "18rem" }} className="card">
        <div className="card-img">
          <Card.Img
            className="card-img-src"
            src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
          />
        </div>
        <Card.Body className="card-content">
          <Card.Title className="card-title">
            <h3>{movie.title}</h3>
          </Card.Title>
          
          <Button
            id="BotonCarta"
            variant="primary"
            className="card-link"
            onClick={() => seeDetail()}
          >
            Más Detalles
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
