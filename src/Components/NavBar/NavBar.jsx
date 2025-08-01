import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { clearSearchEquipo } from "../../Store/Slices/searchSlice";
import Logo from "../../assets/MiNegocio.png";
import { useNavigate } from "react-router-dom";
import CartContador from "../CartContador/CartContador.jsx";

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:915px)");
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogoClick = () => {
    dispatch(clearSearchEquipo());
    navigate("/home");
  };

  const handlecartClick = () => {
    navigate("/vistacart");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          top: isSmallScreen ? "auto" : 0,
          bottom: isSmallScreen ? 0 : "auto",
          boxShadow: theme.shadows[4],
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box
            onClick={handleLogoClick}
          >
            <img
              src={Logo}
              alt="logo"
              style={{
                display: "block",
                maxWidth: "clamp(150px, 25vw, 300px)",
                maxHeight: "clamp(40px, 5vw, 80px)",
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            {isSmallScreen ? "Mi negocio" : "Mi negocio.com"}
          </Typography>

          <IconButton
            onClick={handlecartClick}
            disableRipple
            sx={{
              cursor: "pointer",
              p: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.light
                  : theme.palette.secondary.light,
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <CartContador size={isXs ? 28 : 38} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
