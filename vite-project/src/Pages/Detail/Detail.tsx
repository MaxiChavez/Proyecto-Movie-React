import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { movieData } from "../../Components/Common/Services/Slices/detailSlice";
import { getPeliculaById } from '../../Components/Common/Services/apiCalls';



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
                    <h1>{movie?.title}</h1><br></br>
                    <h1>{movie?.release_date}</h1><br></br>
                    <h1>{movie?.overview}</h1><br></br>

                    {movie?.genres.map((genre) => (
                        <h1>{genre.name}</h1>
                    ))}
                    {movie?.production_companies.map((production_comp) => (
                        <div>
                            <h1>{production_comp.name}</h1>
                            <h1>{production_comp.origin_country}</h1>
                        </div>
                    ))}
                    <h1>{movie?.budget}</h1><br></br>
                    
                    <h1>{movie?.poster_path}</h1><br></br>
                    
                    </>
                )

                : (<>cargando...</>)
            }
        </>
  )
}
