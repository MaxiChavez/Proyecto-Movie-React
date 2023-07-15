import { useEffect, useState } from "react";
import { getPeliculas } from "../../Common/Services/apiCalls";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Home.css";

export const Home = () => {
  interface PeliData {
    id: string;
    name: string;
    overview: string;
    image: string;
  }

  const [Movies, SetMovies] = useState<PeliData[]>([]);

  useEffect(() => {
    const traerData = async () => {
      try {
        const peliculas = await getPeliculas();
        SetMovies(peliculas);
        console.log(peliculas);
        // manipular aca
      } catch (error) {
        console.log("Error al traer las pelis:", error);
      }
    };

    traerData();
  }, []);
  console.log(Movies);
  return (
    <div className="carta">
      {Movies.map((movie) => (
        <Card key={movie.id} style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.overview}</Card.Text>
            <Button variant="primary">Más Detalles</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Home;
