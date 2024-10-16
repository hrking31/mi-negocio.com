import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  equipoSeleccionado: {
    name: "",
    description: "",
    url: [],
    images: [],
  },
};

const equipoSeleccionadoSlice = createSlice({
  name: "equipo",
  initialState,
  reducers: {
    setEquipoSeleccionado: (state, action) => {
      state.equipoSeleccionado = action.payload;
    },
    actualizarImagenes: (state, action) => {
      state.equipoSeleccionado.images = action.payload;
    },
    eliminarImagenPorIndice: (state, action) => {
      state.equipoSeleccionado.images.splice(action.payload, 1);
    },
  },
});

export const {
  setEquipoSeleccionado,
  actualizarImagenes,
  eliminarImagenPorIndice,
} = equipoSeleccionadoSlice.actions;

export default equipoSeleccionadoSlice.reducer;
