import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
    name: "detail",
    initialState: {
      movie: {},
    },
    reducers: {
      addMovie: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
      addMovies: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
});

//exporto las ACCIONES.....
export const { addMovie } = detailSlice.actions;

export const movieData = (state: any) => state.detail;

export default detailSlice.reducer;
