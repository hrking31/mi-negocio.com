import { Typography, Box, Grid, Button } from "@mui/material";
import Register from "../../Components/Register/Register";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function VistaCrearUsuarios() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ color: "#8B3A3A", fontWeight: "bold", mb: 4 }}
      >
        Bienvenido/a {user?.email}
      </Typography>
      <Register />;
      <Grid item xs={12} sm={6} md={4}>
        <Button
          component={Link}
          to="/adminforms"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            height: "45px",
            color: "#ffffff",
            backgroundColor: "#1E90FF",
            "&:hover": {
              backgroundColor: "#4682B4",
            },
          }}
        >
          CANCELAR
        </Button>
      </Grid>
    </Box>
  );
}
