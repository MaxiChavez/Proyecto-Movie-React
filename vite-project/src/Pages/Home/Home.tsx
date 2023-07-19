import { useEffect, useState } from "react";
import { getPeliculas } from "../../Components/Common/Services/apiCalls";
import { CardMovie } from "../../Components/CardMovie/CardMovie";
import { useSelector } from "react-redux";
import { searchData } from "../../Components/Common/Services/Slices/searchSlice";
import "./Home.css";

interface PeliData {
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  title: string;
}

export const Home = () => {
  //Traigo la información de la busqueda
  const searchRdxData = useSelector(searchData);

  const [movies, setMovies] = useState<PeliData[]>([]);

  useEffect(() => {
    const traerData = async () => {
      try {
        if (searchRdxData.findings.length == 0 || searchRdxData == undefined) {
          const peliculas = await getPeliculas();
          setMovies(peliculas);
          console.log("Movie data redux esta undefined");
        } else {
          setMovies(searchRdxData);
          console.log("Movie data redux no tiene nada");
        }
      } catch (error) {
        console.log("Error al traer las pelis:", error);
      }
    };
    traerData();
  }, [searchRdxData]);

  return (
    <div className="card-section">
      {searchRdxData &&
      searchRdxData.findings &&
      searchRdxData.findings.length > 0 ? (
        <>
          {searchRdxData.findings.map((movie: PeliData) => {
            return (
              <CardMovie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                image={movie.poster_path}
              ></CardMovie>
            );
          })}
        </>
      ) : (
        <>
          {movies?.map((movie: PeliData) => {
            return (
              <CardMovie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                image={movie.poster_path}
              ></CardMovie>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Home;
