import axios from "axios";
const urlBase = "https://api.themoviedb.org/3/movie/";
const urlPeliculas =
  "https://api.themoviedb.org/3/movie/popular?language=es-US&page=1";
const apiKey = "bc99b17ba8e893798f028f896418a300";
const image_path = "https://image.tmbd.org/t/p/original";

export const getPeliculas = async () => {
  let url = `${urlPeliculas}&api_key=${apiKey}`;
  let { data } = await axios.get(url);
  return data.results;
};

export const getPeliculaById = async (id: string) => {
  let url = `${urlBase}${id}?language=es&api_key=${apiKey}`;
  let { data } = await axios.get(url);
  return data;
};

export const getPeliculasBySearch = async (search: string) => {
  let url = `${urlPeliculas}&api_key=${apiKey}`;
  let { data } = await axios.get(url);
  return data.results;
};

export const getImages = async (id: string) => {
  let { data } = await axios.get(`${image_path}/${id}`);
  return data;
};

export const searchMoviesByFilter = async (search: string) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: apiKey,
          query: search,
        },
      }
    );
    const results = response.data.results;
    console.log("--------------RESULTADOS DE BUSQUEDA----------");
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const traerVeintes = async () => {
  let url = `https://api.themoviedb.org/3/movie/top_rated?language=es&api_key=${apiKey}`;
  let { data } = await axios.get(url);
  return data.results;
};
