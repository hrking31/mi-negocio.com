// import CardSearchEquipos from "../CardSearchEquipos/CardSearchEquipos.jsx";
// import { Container, Grid } from "@mui/material";
// import { useSelector } from "react-redux";

// export default function CardsSearchEquipos() {
//   const equipos = useSelector((state) => state.search.results);

//   return (
//     <div>
//       <Container>
//         <Grid
//           container
//           rowSpacing={{ xs: 2, sm: 6, md: 8 }}
//           columnSpacing={{ xs: 2, sm: 6, md: 8 }}
//         >
//           {equipos &&
//             equipos.map((equipo, index) => {
//               const imageUrl =
//                 equipo.images && equipo.images.length > 0
//                   ? equipo.images[0].url
//                   : "default-image-url.jpg";

//               return (
//                 <Grid item xs={12} sm={6} md={6} key={index}>
//                   <CardSearchEquipos equipo={equipo} />
//                 </Grid>
//               );
//             })}
//         </Grid>
//       </Container>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Snackbar, Alert, Container, Grid } from "@mui/material";
import CardSearchEquipos from "../CardSearchEquipos/CardSearchEquipos.jsx";
import LoadingLogo from "../LoadingLogo/LoadingLogo.jsx";

export default function CardsSearchEquipos() {
  const equipos = useSelector((state) => state.search.results);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(
        "Hubo un problema al realizar la búsqueda. Inténtalo de nuevo."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } else if (!loading && equipos.length === 0 && equipos !== undefined) {
      setSnackbarMessage("No se encontraron equipos.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
    }
  }, [error, equipos, loading]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <LoadingLogo />
        </Grid>
      ) : (
        <Grid
          container
          rowSpacing={{ xs: 2, sm: 6, md: 8 }}
          columnSpacing={{ xs: 2, sm: 6, md: 8 }}
        >
          {equipos.map((equipo, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CardSearchEquipos equipo={equipo} />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
