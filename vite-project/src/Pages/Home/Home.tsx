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
  //Traigo la información de la búsqueda desde el estado de Redux
  const searchRdxData = useSelector(searchData);

  const [movies, setMovies] = useState<PeliData[]>([]);

  useEffect(() => {
    const traerData = async () => {
      try {
        let peliculas: PeliData[] = [];

        if (
          searchRdxData.findings.length === 0 ||
          searchRdxData === undefined
        ) {
          peliculas = await getPeliculas();
        } else {
          peliculas = searchRdxData.findings;
        }

        setMovies(peliculas);
      } catch (error) {
        console.log("Error al traer las películas:", error);
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
              // Verifica si movie.poster_path no es nulo antes de renderizar el componente
              movie.poster_path && (
                <CardMovie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  image={movie.poster_path}
                />
              )
            );
          })}
        </>
      ) : (
        <>
          {movies?.map((movie: PeliData) => {
            return (
              // Verifica si movie.poster_path no es nulo antes de renderizar el componente
              movie.poster_path && (
                <CardMovie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  image={movie.poster_path}
                />
              )
            );
          })}
        </>
      )}
    </div>
  );
};

export default Home;
