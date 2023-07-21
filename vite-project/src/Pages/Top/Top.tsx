import "./Top.css";
import { useEffect, useState } from "react";
import { traerVeintes } from "../../Components/Common/Services/apiCalls";
import { CardMovie } from "../../Components/CardMovie/CardMovie";

interface PeliData {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
}

export const Top = () => {
  const [topMovies, setTopMovies] = useState<PeliData[]>([]);

  useEffect(() => {
    const traerDataVeintes = async () => {
      try {
        const data = await traerVeintes();
        setTopMovies(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    traerDataVeintes();
  }, []);

  return (
    <>
    <div className="top-twenty-section">
      {topMovies.map((movie: PeliData) => (
        <CardMovie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          image={movie.poster_path}
        />
      ))}
      </div>
    </>
  );
};
