import axios from "axios";
const urlBase = "https://api.themoviedb.org/3/movie/"
const urlPeliculas = "https://api.themoviedb.org/3/movie/popular?language=es-US&page=1";
const apiKey = "bc99b17ba8e893798f028f896418a300";
const image_path = "https://image.tmbd.org/t/p/original";
const url_image = "https://image.tmbd.org/t/p/original";

// const IMG_Peliculas = "https://api.themoviedb.org/3/movie/movie_id/images";

const options = {
  method: "GET",
  url: `${urlPeliculas}&api_key=${apiKey}`,
  headers: {
    params: { language: "es" },
    accept: "application/json",
  },
};

export const getPeliculas = async () => {
  let { data } = await axios.get(options.url);
  return data.results;
};

export const getPeliculaById = async (id : string) => {
  let url = `${urlBase}${id}?language=es&api_key=${apiKey}`
  let { data } = await axios.get(url);
  return data;
}

export const getImages = async (id : string) => {
  let { data } = await axios.get(`${image_path}/${id}`);
  return data;
};
