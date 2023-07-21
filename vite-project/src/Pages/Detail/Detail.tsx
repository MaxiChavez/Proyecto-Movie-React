import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { movieData } from "../../Components/Common/Services/Slices/detailSlice";
import { getPeliculaById } from "../../Components/Common/Services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./Detail.css";

interface Genre {
  id: string;
  name: string;
}

interface ProductionCompanies {
  id: string;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface MovieDetail {
  id: string;
  runtime: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  production_companies: ProductionCompanies[];
  director: string;
  budget: string;
  vote_average: number;
  release_date: string;
}

export const Detail = () => {
  const navigate = useNavigate();
  //La informacion que tiene la carta solamente
  const movieDataRedux = useSelector(movieData);

  const [movie, setMovie] = useState<MovieDetail>();

  useEffect(() => {
    const traerData = async () => {
      try {
        const pelicula = await getPeliculaById(movieDataRedux.movie.id);
        setMovie(pelicula);
        console.log(pelicula);

        // manipular aca
      } catch (error) {
        console.log("Error al traer las pelis:", error);
      }
    };
    traerData();
  }, []);
  function convertirFecha(fecha?: string): string {
    if (!fecha) {
      return "";
    }

    const partes = fecha.split("-");
    const dia = partes[2];
    const mes = partes[1];
    const año = partes[0];

    return `${dia}/${mes}/${año}`;
  }
  function volver() {
    navigate("/");
  }
  return (
    <>
      {movieDataRedux.movie.id !== "" ? (
        //Aquí en este caso podríamos buscar una card de React bootstrap
        //pasarle los datos mediante props y que se encargue de renderizar
        //un perfil del character escogido....
        <>
          <section id="detail-section">
            <div className="container">
              <div className="row card-detail">
                <div className="col-lg-5">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt="Imagen de la película"
                    className="img-fluid img-detail"
                  />
                </div>

                <div className="col-lg-7 detail-info">
                  <h2 className="detail-title">{movie?.title}</h2>
                  <br />
                  <h5>Lanzamiento: {convertirFecha(movie?.release_date)}</h5>

                  {movie?.overview ? (
                    <>
                      <h5>Sinopsis:</h5>
                      <p className="overview-detail">{movie?.overview}</p>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}

                  {movie?.genres ? (
                    <>
                      <h5 className="grisado">
                        Generos:
                        {movie?.genres.map((genre) => (
                          <>{" " + genre.name}</>
                        ))}
                      </h5>
                    </>
                  ) : (
                    <></>
                  )}

                  {movie?.budget != "0" ? (
                    <>
                      <h5 className="grisado">Presupuesto: ${movie?.budget}</h5>
                    </>
                  ) : (
                    <></>
                  )}

                  {movie?.production_companies ? (
                    <>
                      <h5 className="grisado">
                        Productoras:
                        {movie?.production_companies.map((production_comp) => (
                          <>
                            {" " + production_comp.name + " ("}
                            {production_comp.origin_country + ") "}
                          </>
                        ))}
                      </h5>
                    </>
                  ) : (
                    <></>
                  )}

                  <button
                    className="carta-link btnCard"
                    onClick={() => volver()}
                  >
                    VOLVER
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>cargando...</>
      )}
    </>
  );
};
