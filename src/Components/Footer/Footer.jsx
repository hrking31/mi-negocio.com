import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Instagram, Facebook, Email, Business } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const isSmall = useMediaQuery("(max-width:600px)");

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        mt: 6,
        pt: 4,
        pb: 1,
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${
          theme.palette.mode === "light" ? "#5C6B73" : "#A0AEC0"
        }`,

        px: 2,
      }}
    >
      <Typography
        variant={isSmall ? "h6" : "h5"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.light
              : theme.palette.secondary.light,
        }}
      >
        <Business
          sx={{
            color:
              theme.palette.mode === "light"
                ? theme.palette.primary.light
                : theme.palette.secondary.light,
          }}
        />
        Mi negocio.com
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          fontSize: isSmall ? "0.8rem" : "1rem",
          mt: 0.5,
        }}
      >
        La solución todo en uno para gestionar tu negocio, productos, y
        clientes.
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Typography variant="subtitle3">
          📍 Cra. 68 #74-158, Barranquilla, Colombia.
        </Typography>{" "}
        <Typography variant="subtitle3">
          🕒 Lunes: 8:00 AM - 6:00 PM | Sábado: 8:00 AM - 2:00 PM
        </Typography>
      </Box>

      <Box
        sx={{
          mt: { xs: 0, md: 1 },
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Tooltip title="Email">
          <IconButton
            href="mailto:hrking31@gmail.com"
            target="_blank"
            rel="noopener"
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.light
                  : theme.palette.secondary.light,
            }}
          >
            <Email />
          </IconButton>
        </Tooltip>
        <Tooltip title="Instagram">
          <IconButton
            href="https://www.instagram.com/hrking31?igsh=M3l1aW1tbzRmb2l5"
            target="_blank"
            rel="noopener"
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.light
                  : theme.palette.secondary.light,
            }}
          >
            <Instagram />
          </IconButton>
        </Tooltip>
        <Tooltip title="Facebook">
          <IconButton
            href="https://www.facebook.com/share/19vyzWCtg5/"
            target="_blank"
            rel="noopener"
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.light
                  : theme.palette.secondary.light,
            }}
          >
            <Facebook />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography
        sx={{
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.light
              : theme.palette.secondary.light,
          mt: { xs: 0.5, md: 1 },
          fontSize: {
            xs: "0.5rem",
            sm: "0.6rem",
            md: "0.7rem",
          },
        }}
      >
        © {new Date().getFullYear()} Mi negocio.com. Todos los derechos
        reservados.
      </Typography>
    </Box>
  );
}
