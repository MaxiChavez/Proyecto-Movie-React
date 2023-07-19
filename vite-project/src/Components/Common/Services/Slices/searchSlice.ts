import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
      findings: []
    },
    reducers: {
      addFindings: (state, action) => {
        return {
          ...state,
          ...action.payload,
        }
      },
      deleteFindings: (state, action) => {
        return {
          ...state,
          ...action.payload,
        }
      }
    }
});

//exporto las ACCIONES.....
export const { addFindings, deleteFindings } = searchSlice.actions;

export const searchData = (state: any) => state.search;

export default searchSlice.reducer;