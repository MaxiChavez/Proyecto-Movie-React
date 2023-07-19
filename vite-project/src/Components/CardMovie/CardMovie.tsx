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
      <div key={movie.id}  className="carta">
        <div className="carta-img">
          <img
            className="carta-img-src"
            src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
          />
        </div>
        <div className="carta-content">
          <div className="carta-title">
            <h3>{movie.title}</h3>
          </div>
          <div className="botonCarta">
          <button
            
            className="carta-link btnCard"
            onClick={() => seeDetail()}
          >
            Más Detalles
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
