import style from "./AdminForms.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Button from "@mui/material/Button";
import { Typography, Box, Grid } from "@mui/material";

export default function AdminForms() {
  const { user, logout, loading } = useAuth();

  const handlerLogout = async () => {
    await logout();
  };

  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" sx={{ color: "#8B3A3A", fontWeight: "bold" }}>
          Bienvenida {user.email}, ¿Qué vamos a hacer hoy?
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 4 }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/vistacotizacion"
            variant="contained"
            fullWidth
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
            }}
          >
            COTIZACIÓN
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/vistacuentadecobro"
            variant="contained"
            fullWidth
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
            }}
          >
            CUENTA DE COBRO
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/vistacreaequipo"
            variant="contained"
            fullWidth
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
            }}
          >
            CREAR EQUIPO
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/vistaseleccionarequipo"
            variant="contained"
            fullWidth
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
            }}
          >
            EDITAR o ELIMINAR EQUIPO
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/VistaCrearUsuarios"
            variant="contained"
            fullWidth
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
            }}
          >
            CREAR USUARIOS
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            onClick={handlerLogout}
            variant="contained"
            fullWidth
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#DC143C",
              },
              margin: "0 auto",
            }}
          >
            CERRAR SESIÓN
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
