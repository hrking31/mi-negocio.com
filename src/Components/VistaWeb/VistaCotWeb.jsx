import { useSelector } from "react-redux";
import Logo from "../../assets/MiNegocio.png";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";

export default function VistaCotWeb() {
  const formValues = useSelector((state) => state.cotizacion);
  const items = useSelector((state) => state.cotizacion.value.items);
  const total = useSelector((state) => state.cotizacion.value.total);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        fontFamily: "Arial, sans-serif",
        padding: isSmallScreen ? "20px" : "40px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "white",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Grid
        container
        spacing={1}
        direction={isSmallScreen ? "row" : "row"}
        alignItems="center"
        justifyContent="center"
        sx={{
          marginBottom: "20px",
          textAlign: isSmallScreen ? "left" : "center",
        }}
      >
        <Grid item>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: isSmallScreen ? "30px" : "100px",
              height: "auto",
            }}
          />
        </Grid>

        <Grid item>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "blue",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            Mi negocio.com
          </Typography>

          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: "red",
              textAlign: "center",
            }}
          >
            La solución todo en uno para gestionar{" "}
            {isSmallScreen ? <br /> : " "}tu negocio,
            {!isSmallScreen ? <br /> : " "} productos, y clientes.
            <br />
            Nit: 72.272.605 - 1
          </Typography>
        </Grid>
      </Grid>

      <Typography
        variant="subtitle2"
        sx={{
          textAlign: "left",
          marginBottom: "10px",
        }}
      >
        Barranquilla, {formValues.value.fecha}
        <br />
        Señores: {formValues.value.empresa}
        <br />
        Nit: {formValues.value.nit}
        <br />
        Obra: {formValues.value.direccion}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: theme.palette.mode === "light" ? "#3A5169" : "#A0AEC0",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        Cotización
      </Typography>

      {items.map((item, index) => (
        <Grid
          container
          key={index}
          sx={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
        >
          <Grid item xs={6}>
            <Typography
              variant="subtitle2"
              sx={{
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {item.quantity} {item.description}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography variant="subtitle1">{item.subtotal}</Typography>
          </Grid>
        </Grid>
      ))}

      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "right",
          mt: "20px",
        }}
      >
        Total: {total}
      </Typography>

      <Box sx={{ mt: "40px", textAlign: "center" }}>
        <Typography
          variant="caption"
          sx={{
            fontSize: isSmallScreen ? "0.625rem" : "0.75rem",
            color: "blue",
            lineHeight: "1.2",
          }}
        >
          hrking31@gmail.com
          <br />
          hrking31@hotmail.com
          <br />
          Cra. 68 #74-158 Tel 605 3258759 - 302 8446805
          <br />
          BARRANQUILLA - COLOMBIA
        </Typography>
      </Box>
    </Box>
  );
}
