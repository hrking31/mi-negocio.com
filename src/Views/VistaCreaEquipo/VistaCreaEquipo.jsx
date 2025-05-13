import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingLogo from "../../Components/LoadingLogo/LoadingLogo";
import { useAuth } from "../../Context/AuthContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { storage, db } from "../../Components/Firebase/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";
import style from "./VistaCreaEquipo.module.css";

export default function VistaCreaEquipo() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const { name, genero } = useSelector((state) => state.user);
  const [formValues, setFormValues] = useState({ name: "", description: "" });
  const [images, setImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const saludo = genero === "femenino" ? "Bienvenida" : "Bienvenido";

  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      name: "",
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleNameChange = (index, newName) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, name: newName } : img
      )
    );
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleUploadImages = async (equipoId) => {
    const uploadPromises = images.map(async (img) => {
      const uniqueName = `${img.name}-${Date.now()}`;
      const storageRef = ref(storage, `${equipoId}/${uniqueName}`);
      await uploadBytes(storageRef, img.file);
      const downloadURL = await getDownloadURL(storageRef);
      return { name: img.name, url: downloadURL, path: storageRef.fullPath };
    });

    return await Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = formValues;

    if (!name || !description || images.length === 0) {
      setSnackbarMessage("Todos los campos son obligatorios.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);

    try {
      const equipoRef = doc(collection(db, "equipos"));
      const equipoId = equipoRef.id;

      const uploadedImages = await handleUploadImages(equipoId);

      const data = {
        id: equipoId,
        name,
        description,
        images: uploadedImages,
        nameLowerCase: name.toLowerCase(),
      };

      await setDoc(equipoRef, data);

      setSnackbarMessage("Equipo creado exitosamente.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setFormValues({ name: "", description: "" });
      setImages([]);
    } catch (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormValues({ name: "", description: "" });
    setImages([]);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlerLogout = async () => {
    await logout();
  };

  if (loading) return <LoadingLogo />;

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ color: "#8B3A3A", fontWeight: "bold", mb: 4 }}
        >
          {saludo} {name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              label="Nombre del equipo"
              value={formValues.name}
              onChange={handlerInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Descripción del equipo"
              value={formValues.description}
              onChange={handlerInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            {images &&
              images.map((img, index) => (
                <Box
                  key={img.id}
                  sx={{ mb: 2, mt: 2, display: "flex", alignItems: "center" }}
                >
                  <img
                    src={img.preview}
                    alt={`preview-${index}`}
                    className={style.previewImage}
                    style={{ width: 80, height: 80, marginRight: 10 }}
                  />
                  <TextField
                    label="Nombre de la imagen"
                    value={img.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    size="small"
                    sx={{ flexGrow: 1, mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      marginLeft: 2,
                      width: "200px",
                      height: "45px",
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    height: "45px",
                    color: "#ffffff",
                    backgroundColor: "#1E90FF",
                    "&:hover": {
                      backgroundColor: "#4682B4",
                    },
                    mt: 2,
                    mb: 2,
                  }}
                >
                  Selecciona Imagen
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                name="fotos"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
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
              Crear Equipo
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              onClick={handleCancel}
              variant="contained"
              fullWidth
              sx={{
                height: "45px",
                color: "#ffffff",
                backgroundColor: "#1E90FF",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                },
              }}
            >
              CANCELAR
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/adminforms"
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
              CERRAR SESION
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
}
