import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { movieData } from "../../Components/Common/Services/Slices/detailSlice";
import { getPeliculaById } from '../../Components/Common/Services/apiCalls';
import "./Detail.css"

export const Detail = () => {

    interface Genre {
        id : string,
        name : string
    }

    interface ProductionCompanies{
        id : string,
        logo_path : string,
        name : string,
        origin_country : string,
    }
    
    interface MovieDetail {
        id :string,
        runtime : number,
        title : string,
        poster_path : string,
        overview : string,
        genres: Genre[],
        production_companies : ProductionCompanies[],
        director : string,
        budget: string,
        vote_average : number,
        release_date :string,
    }

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

  return (
    <>
            {
                movieDataRedux.movie.id !== ""
                
                ? (
                    //Aquí en este caso podríamos buscar una card de React bootstrap 
                    //pasarle los datos mediante props y que se encargue de renderizar
                    //un perfil del character escogido....
                    <>
                    <section id="todo">
      

      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <img
               src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt="Imagen de la película"
              className="img-fluid img-detail"
            />
          </div>

          <div className="col-lg-8">
            <h2>{movie?.title}</h2>
            <h4>{movie?.release_date}</h4>
            <h4>Generos:
            {movie?.genres.map((genre) => (
                        <>{genre.name+ " "}</>
                    ))}
            </h4>
            <p className='overview-detail'>
              {movie?.overview}
            </p>
            <p>Presupuesto: ${movie?.budget}</p>
            <h4>Productoras:
            {movie?.production_companies.map((production_comp) => (
                        <h5>{production_comp.name +" "} 
                        {production_comp.origin_country}</h5>
                    ))}
            </h4>
          </div>
        </div>
      </div>
    </section>
    </>)
                : (<>cargando...</>)
            }
        </>
  )
}
