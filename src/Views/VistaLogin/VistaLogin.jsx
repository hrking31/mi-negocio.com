import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { togglePasswordVisibility } from "../../Store/Slices/passwordSlice";
import { setUserData } from "../../Store/Slices/userSlice";
import { useAuth } from "../../Context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Components/Firebase/Firebase"; 

export default function Login() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const passwordVisible = useSelector((state) => state.password);
  const passwordType = passwordVisible ? "text" : "password";

  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ target: { name, value } }) =>
    setUser((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const userCredential = await login(user.email, user.password);
      const { uid, email } = userCredential.user;

      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { role, permisos } = userDoc.data();

        dispatch(setUserData({ uid, email, role, permisos }));

        navigate("/adminforms");
      } else {
        setError("No se encontró información del usuario en Firestore.");
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no registrado");
      } else {
        setError("Error al iniciar sesión");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        width: "90%",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid #00008B",
        borderRadius: "5px",
        backgroundColor: "transparent",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 3, color: "#00008B" }}>
              Iniciar sesión en mi cuenta
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mt: 2, color: "#b22222" }}>
                {error}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="Dirección de correo electrónico"
              value={user.email}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ style: { color: "#00008B" } }}
              InputProps={{ style: { color: "#00008B" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#00008B" },
                  "&:hover fieldset": { borderColor: "#4682B4" },
                  "&.Mui-focused fieldset": { borderColor: "#1E90FF" },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={passwordType}
              name="password"
              label="Contraseña"
              value={user.password}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ style: { color: "#00008B" } }}
              InputProps={{
                style: { color: "#00008B" },
                endAdornment: (
                  <IconButton
                    onClick={() => dispatch(togglePasswordVisibility())}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash color="#00008B" />
                    ) : (
                      <FaEye color="#00008B" />
                    )}
                  </IconButton>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#00008B" },
                  "&:hover fieldset": { borderColor: "#4682B4" },
                  "&.Mui-focused fieldset": { borderColor: "#1E90FF" },
                },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#1E90FF",
              color: "#fff",
              "&:hover": { backgroundColor: "#4682B4" },
            }}
          >
            ACCESO
          </Button>
        </Box>
      </form>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
            }}
          >
            <InfoIcon color="primary" />
            Acceso Demo
          </DialogTitle>

          <DialogContent>
            <DialogContentText component="div">
              <Box>
                <Typography variant="body1">
                  <strong>Usuario:</strong> admin@gmail.com
                </Typography>
                <Typography variant="body1">
                  <strong>Contraseña:</strong> mi.negocio.com
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 2, fontStyle: "italic", color: "text.secondary" }}
                >
                  Usa estas credenciales para acceder como administrador.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 3, fontWeight: "bold", color: "primary.main" }}
                >
                  ¡Crea tu producto y comienza a probar la app!
                </Typography>
              </Box>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              Empezar Demo
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Box>
  );
}
