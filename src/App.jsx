import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Landing,
  Home,
  Detail,
  AdminForms,
  VistaCotizacion,
  VistaCuentaDeCobro,
  VistaCreaEquipo,
  VistaSeleccionarEquipo,
  VistaEliminarEquipo,
  VistaEditarEquipo,
  VistaCrearUsuarios,
  VistaEliminarUsuario,
  VistaNoAutorizada,
  VistaCart,
} from "./Views/index.js";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";
import NavBar from "./Components/NavBar/NavBar.jsx";
import { addToCart } from "./Store/Slices/cartSlice.js";
import { setCliente } from "./Store/Slices/clienteSlice.js";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const cliente = useSelector((state) => state.cliente);

  useEffect(() => {
    if (items.length === 0) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        parsed.items.forEach((item) => {
          dispatch(addToCart(item));
        });
      }
    }

    const isClienteVacio = Object.entries(cliente).every(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return Object.values(value).every((v) => v === "");
      }
      return value === "";
    });
    if (isClienteVacio) {
      const storedCliente = localStorage.getItem("datosCliente");

      if (storedCliente) {
        const parsedCliente = JSON.parse(storedCliente);
        dispatch(setCliente(parsedCliente));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify({ items }));
    } else {
      localStorage.removeItem("cart");
    }
  }, [items]);

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route
          path="/adminforms"
          element={
            <ProtectedRoutes>
              <AdminForms />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vistacotizacion"
          element={
            <ProtectedRoutes
              allowedRoles={[
                "administrador",
                "gestorIntegral",
                "gestorFacturacion",
              ]}
            >
              <VistaCotizacion />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vistacuentadecobro"
          element={
            <ProtectedRoutes
              allowedRoles={[
                "administrador",
                "gestorIntegral",
                "gestorFacturacion",
              ]}
            >
              <VistaCuentaDeCobro />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vistacreaequipo"
          element={
            <ProtectedRoutes
              allowedRoles={["administrador", "gestorEditor", "gestorIntegral"]}
            >
              <VistaCreaEquipo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vistaseleccionarequipo"
          element={
            <ProtectedRoutes
              allowedRoles={["administrador", "gestorEditor", "gestorIntegral"]}
            >
              <VistaSeleccionarEquipo />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/vistaeliminarequipo"
          element={
            <ProtectedRoutes
              allowedRoles={["administrador", "gestorEditor", "gestorIntegral"]}
            >
              <VistaEliminarEquipo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vistaeditarequipo"
          element={
            <ProtectedRoutes
              allowedRoles={["administrador", "gestorEditor", "gestorIntegral"]}
            >
              <VistaEditarEquipo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vistacrearusuarios"
          element={
            <ProtectedRoutes allowedRoles={["administrador"]}>
              <VistaCrearUsuarios />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vistaeliminarusuario"
          element={
            <ProtectedRoutes allowedRoles={["administrador"]}>
              <VistaEliminarUsuario />
            </ProtectedRoutes>
          }
        />
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route path="/vistanoautorizada" element={<VistaNoAutorizada />} />
        <Route path="/vistacart" element={<VistaCart />} />
      </Routes>
    </div>
  );
}

export default App;
