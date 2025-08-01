import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import {
  FaTools,
  FaUserShield,
  FaFilePdf,
  FaGoogle,
  FaCogs,
} from "react-icons/fa";

export default function Landing() {

  return (
    <Box style={{ backgroundColor: "#fff", color: "#333" }}>
      <Box
        sx={{
          textAlign: "center",
          py: 10,
          backgroundColor: "#3f51b5",
          color: "#fff",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", mb: 0 }}
            gutterBottom
          >
            Mi Negocio.com
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#FF5733", fontWeight: "bold", mt: 0 }}
            paragraph
          >
            La solución todo en uno para gestionar tu negocio, productos, y
            clientes.
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{ maxWidth: 600, margin: "0 auto", mb: 6 }}
        >
          Plataforma web completa para gestionar productos, cotizaciones,
          cuentas de cobro y usuarios. Ideal para negocios de alquiler, venta o
          servicios.
        </Typography>

        <Box sx={{ display: "inline-flex", gap: 3 }}>
          <Link
            to="/home"
            state={{ mostrarModal: true }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="secondary" size="large">
              Ver Demo
            </Button>
          </Link>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="https://github.com/hrking31/mi-negocio.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            Código en GitHub
          </Button>
        </Box>
      </Box>

      <Box sx={{ py: 12, px: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ¿Qué puede hacer Mi Negocio.com?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<FaTools size={30} />}
              title="Gestión de Productos"
              description="Crea, edita y elimina productos con imágenes desde Firebase. Control total desde el panel de administración."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<FaUserShield size={30} />}
              title="Roles y Usuarios"
              description="Autenticación con Firebase y asignación de roles personalizados para controlar el acceso al sistema."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<FaFilePdf size={30} />}
              title="PDF en Tiempo Real"
              description="Visualiza cotizaciones y cuentas de cobro en PDF en tiempo real y descárgalas con membrete personalizado."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<FaGoogle size={30} />}
              title="Firebase Integrado"
              description="Base de datos en tiempo real, almacenamiento en la nube y autenticación, todo con Firebase."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<FaCogs size={30} />}
              title="Adaptable y Escalable"
              description="Diseñada para crecer contigo. Úsala para ventas, alquileres o cualquier negocio con flujo documental."
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ py: 12, backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          ¿Listo para conocer más?
        </Typography>

        <Typography variant="body1" sx={{ mb: 6 }}>
          Explora el código fuente o contáctame para colaborar en proyectos.
        </Typography>

        <Box sx={{ display: "inline-flex", gap: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="https://github.com/hrking31/mi-negocio.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            Ver en GitHub
          </Button>

          <Tooltip
            title="hrking31@gmail.com"
            arrow
            href="mailto:hrking31@gmail.com"
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" color="primary" size="large">
              Contáctame
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          {icon}
        </Box>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "90px",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
