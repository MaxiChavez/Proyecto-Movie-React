import axios from "axios";

const urlPeliculas =
  "https://api.themoviedb.org/3/movie/popular?language=es-US&page=1";
const keyPeliculas = "210d6a5dd3f16419ce349c9f1b200d6d";
const image_path = "https://image.tmbd.org/t/p/original";
const url_image = "https://image.tmbd.org/t/p/original";

// const IMG_Peliculas = "https://api.themoviedb.org/3/movie/movie_id/images";

const options = {
  method: "GET",
  url: `${urlPeliculas}&api_key=${keyPeliculas}`,
  headers: {
    params: { language: "es" },
    accept: "application/json",
  },
};

export const getPeliculas = async () => {
  let { data } = await axios.get(options.url);
  return data.results;
};

export const getImages = async () => {
  let { data } = await axios.get(`${image_path}/${id}`);

  return data;
};
