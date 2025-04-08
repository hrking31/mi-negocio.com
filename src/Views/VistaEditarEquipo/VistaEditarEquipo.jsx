import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchEquipos } from "../../Store/Slices/searchSlice";
import SearchComponent from "../../Components/SearchComponent/SearchComponent";
import EditarEquipos from "../../Components/EditarEquipos/EditarEquipos";
import CardsSearchEquipos from "../../Components/CardsSearchEquipos/CardsSearchEquipos";

const VistaEditarEquipo = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  const handleSearch = (searchTerm) => {
    dispatch(fetchEquipos(searchTerm));
  };

  const handlerLogout = async () => {
    await logout();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ marginBottom: 4 }}>
              <SearchComponent onSearch={handleSearch} />
            </Box>
            <Box sx={{ marginBottom: 4 }}>
              <CardsSearchEquipos />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ marginBottom: 4 }}>
              <EditarEquipos />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/admin"
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
            MENU
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
                backgroundColor: "#4682B4",
              },
            }}
          >
            CERRAR SESIÓN
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VistaEditarEquipo;
