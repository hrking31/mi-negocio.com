import { Box, Typography } from "@mui/material";
import RotatingImage from "../rotar/rotar";
import Logos from "../../assets/MiNegocio.svg";

const LoadingLogo = ({ height = "80vh" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={height}
      margin="0 auto"
    >
      <Box mb={1}>
        <RotatingImage
          src={Logos}
          alt="Rotating Logo"
          style={{ width: "100px", height: "100px", marginBottom: "2px" }}
        />
      </Box>
      <Typography variant="h5" mt={0.5}>
        Cargando...
      </Typography>
    </Box>
  );
};

export default LoadingLogo;
