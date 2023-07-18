import { useEffect, useState } from "react";
import { getPeliculas } from "../../Components/Common/Services/apiCalls";
import "./Home.css";
import { CardMovie } from "../../Components/CardMovie/CardMovie";

export const Home = () => {
  interface PeliData {
    id: string;
    name: string;
    overview: string;
    poster_path: string;
    title: string;
  }

  const [movies, setMovies] = useState<PeliData[]>([]);

  useEffect(() => {
    const traerData = async () => {
      try {
        const peliculas = await getPeliculas();
        setMovies(peliculas);
        // manipular aca
      } catch (error) {
        console.log("Error al traer las pelis:", error);
      }
    };
    traerData();
  }, []);
  console.log(movies);

  return (
    <div className="card-section">
      {movies?.map((movie) => (
        <CardMovie
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          image={movie.poster_path}
        ></CardMovie>
      ))}
    </div>
  );
};

export default Home;
