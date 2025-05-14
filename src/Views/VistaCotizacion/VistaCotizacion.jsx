import { Link } from "react-router-dom";
import Cotizacion from "../../Components/Cotizacion/Cotizacion";
import VistaCotWeb from "../../Components/VistaWeb/VistaCotWeb";
import VistaCotPdf from "../../Components/VistaPdf/VistaCotPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAuth } from "../../Context/AuthContext";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";

export default function VistaCotizacion() {
  const values = useSelector((state) => state.cotizacion);
  const { logout } = useAuth();

  const handlerLogout = async () => {
    await logout();
  };

  return (
    <Box sx={{ minHeight: "100vh", padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Cotizacion />
        </Grid>
        <Grid item xs={12} md={6}>
          <VistaCotWeb />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 4, mt: 2 }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <PDFDownloadLink
            document={<VistaCotPdf values={values} />}
            fileName={`${values.value.empresa}.pdf`}
          >
            {({ loading }) => (
              <Button
                variant="success"
                fullWidth
              >
                {loading ? "Cargando..." : "Descargar PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/adminforms"
            variant="contained"
            fullWidth
          >
            MENU
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button onClick={handlerLogout} variant="danger" fullWidth>
            CERRAR SESION
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}


// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import { useColorMode } from "../../Theme/ThemeProvider";
// import { Brightness4, Brightness7 } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";

// export default function App() {
//   const theme = useTheme();
//   const { toggleColorMode } = useColorMode();

//   return (
//     <Box sx={{ p: 4 }}>
//       <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h4" gutterBottom>
//             Mi App Moderna
//           </Typography>
//           <IconButton onClick={toggleColorMode}>
//             {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
//           </IconButton>
//         </Box>

//         <Typography variant="body1" sx={{ mb: 2 }}>
//           ¡Este es un ejemplo completo con un tema moderno en MUI!
//         </Typography>

//         <TextField
//           fullWidth
//           label="Tu nombre"
//           variant="outlined"
//           sx={{ mb: 2 }}
//         />

//         <Button variant="contained" color="primary" fullWidth>
//           Enviar
//         </Button>
//       </Paper>
//     </Box>
//   );
// }
