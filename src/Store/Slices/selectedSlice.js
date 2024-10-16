// import { createSlice } from "@reduxjs/toolkit";

// const selectedSlice = createSlice({
//   name: "selected",
//   initialState: null,
//   reducers: {
//     setSelectedEquipo: (state, action) => {
//       return action.payload;
//     },
//     clearSelectedEquipo: () => {
//       return null;
//     },
//     setFormValues: (state, action) => {
//       state.values = action.payload;
//     },
//   },
// });

// export const { setSelectedEquipo, clearSelectedEquipo, setFormValues } =
//   selectedSlice.actions;
// export default selectedSlice.reducer;
/////////////////////////////////////////////////////////////////////////////////////////
// import { createSlice } from "@reduxjs/toolkit";

// const selectedSlice = createSlice({
//   name: "selected",
//   initialState: {
//     selected: [],
//   },
//   reducers: {
//     setSelectedEquipo: (state, action) => {
//       state.selected = action.payload;
//     },
//     clearSelectedEquipo: (state) => {
//       state.selected = [];
//     },
//   },
// });

// export const { setSelectedEquipo, clearSelectedEquipo, setFormValues } =
//   selectedSlice.actions;
// export default selectedSlice.reducer;
////////////////////////////////////////////////////////////////////////////////////
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: {
    name: "",
    description: "",
    url: [],
    images: [],
  },
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelectedEquipo: (state, action) => {
      state.selected = action.payload;
    },
    actualizarImagenes: (state, action) => {
      state.selected.images = action.payload;
    },
    eliminarImagenPorIndice: (state, action) => {
      state.selected.images.splice(action.payload, 1);
    },
    actualizarCampoEquipo: (state, action) => {
      const { field, value } = action.payload;
      state.selected[field] = value;
    },
    clearSelectedEquipo: (state) => {
      state.selected = [];
    },
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
