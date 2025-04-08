import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  url: [],
  images: [],
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelectedEquipo: (state, action) => {
      return { ...action.payload }; 
    },
    actualizarImagenes: (state, action) => {
      state.images = action.payload;
    },
    eliminarImagenPorIndice: (state, action) => {
      state.images.splice(action.payload, 1);
    },
    actualizarCampoEquipo: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    clearSelectedEquipo: () => initialState, 
  },
});

// Exportar acciones
export const {
  setSelectedEquipo,
  actualizarImagenes,
  eliminarImagenPorIndice,
  actualizarCampoEquipo,
  clearSelectedEquipo,
} = selectedSlice.actions;

export default selectedSlice.reducer;
