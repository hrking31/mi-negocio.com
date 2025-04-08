import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./Slices/darkModeSlice";
import equiposReducer from "./Slices/equiposSlice";
import equipoDetailReducer from "./Slices/detailSlice";
import passwordReducer from "./Slices/passwordSlice";
import searchReducer from "./Slices/searchSlice";
import cotizacionReducer from "./Slices/cotizacionSlice";
import cuentacobroReducer from "./Slices/cuentacobroSlice";
import loadingReducer from "./Slices/LoadingSlice";
import selectedReducer from "./Slices/selectedSlice";
import equipoSeleccionadoReducer from "./Slices/equipoSeleccionadoSlice";

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
    equipos: equiposReducer,
    equipoDetail: equipoDetailReducer,
    password: passwordReducer,
    search: searchReducer,
    cotizacion: cotizacionReducer,
    cuentacobro: cuentacobroReducer,
    loading: loadingReducer,
    selected: selectedReducer,
    equipoSeleccionado: equipoSeleccionadoReducer,
  },
});
