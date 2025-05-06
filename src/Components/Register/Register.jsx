import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingLogo from "../../Components/LoadingLogo/LoadingLogo";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function Register() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!isValidEmail(user.email)) {
      setError("Formato de correo no válido");
      setOpenSnackbar(true);
      return;
    }

    if (user.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setOpenSnackbar(true);
      return;
    }

    if (!user.role) {
      setError("Selecciona un rol");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      await signup(user.email, user.password);
      setSuccess(true);
      await setDoc(doc(db, "users", uid), {
        email: user.email,
        role: user.role,
      });
      setOpenSnackbar(true);
      setLoading(false);
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("El correo ya está registrado");
      } else {
        setError("Error al crear la cuenta" + error.message);
      }
      setOpenSnackbar(true);
    }
  };

  if (loading) return <LoadingLogo />;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      maxWidth={400}
      mx="auto"
      mt={5}
      p={3}
      borderRadius={2}
      boxShadow={3}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Registro
      </Typography>

      <TextField
        label="Correo"
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
        placeholder="tucorreo@compañia.ltd"
        fullWidth
        required
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        placeholder="******"
        fullWidth
        required
      />

      <FormControl fullWidth required>
        <InputLabel id="rol-label">Rol</InputLabel>
        <Select
          labelId="rol-label"
          name="role"
          value={user.role}
          onChange={handleChange}
          label="Rol"
        >
          <MenuItem value="admin">Administrador</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="usuario">Usuario</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" type="submit" fullWidth>
        Registrar
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={success ? "success" : "error"}
          onClose={handleCloseSnackbar}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success ? "Usuario registrado con éxito" : error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
