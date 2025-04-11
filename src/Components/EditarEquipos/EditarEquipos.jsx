import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
// import style from "./EditarEquipos.module.css";

const EditarEquipo = () => {
  const location = useLocation();
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(
    () => location.state?.equipo || null
  );
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  console.log("Estado equipo Seleccionado:", equipoSeleccionado);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
  });

  console.log("Estado Equipo Editado:", formData);
  useEffect(() => {
    if (equipoSeleccionado) {
      setFormData({
        name: "",
        description: "",
        images: equipoSeleccionado.images.map((img) => ({
          name: img.name,
          url: img.url,
          file: null,
          isNew: false,
        })),
      });
    }
  }, [equipoSeleccionado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReplaceImage = (index, newFile, newName) => {
    const newPreviewUrl = URL.createObjectURL(newFile);

    const updatedImages = [...formData.images];
    updatedImages[index] = {
      name: newName,
      url: newPreviewUrl,
      file: newFile,
      isNew: true,
    };

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const [editingImageIndex, setEditingImageIndex] = useState(null);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#8B3A3A",
          fontWeight: "bold",
          overflowWrap: "break-word",
          fontSize: { xs: "h5.fontSize", sm: "h4.fontSize" },
        }}
      >
        Editar el equipo
      </Typography>
      <Typography sx={{ color: "#00008B", marginBottom: 2 }}>
        {equipoSeleccionado.name}
      </Typography>
      <Typography sx={{ color: "#00008B", marginBottom: 2 }}>
        {equipoSeleccionado.description}
      </Typography>

      <Grid container spacing={0.5} justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            name="name"
            label="Nuevo Nombre"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            name="description"
            label="Nueva Descripción"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid container spacing={2}>
          {formData.images && formData.images.length > 0
            ? formData.images.map((image, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <img
                      src={image.url}
                      alt={image.name}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ color: "#00008B", marginBottom: 2 }}>
                        {image.name}
                      </Typography>

                      {editingImageIndex !== index ? (
                        <Button
                          variant="contained"
                          onClick={() => setEditingImageIndex(index)}
                          sx={{
                            fontSize: "12px",
                            backgroundColor: "#FFA500",
                            mt: 1,
                            mb: 1,
                            "&:hover": {
                              backgroundColor: "#FF8C00",
                            },
                          }}
                        >
                          Editar Imagen {index + 1}
                        </Button>
                      ) : (
                        <>
                          <TextField
                            label="Nombre de la imagen"
                            value={formData.images[index]?.newName || ""}
                            onChange={(e) =>
                              handleReplaceImage(
                                index,
                                formData.images[index]?.file || null,
                                e.target.value
                              )
                            }
                            size="small"
                            sx={{ flexGrow: 1, mr: 2 }}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleReplaceImage(
                                index,
                                e.target.files[0],
                                formData.images[index]?.name || ""
                              )
                            }
                            style={{ marginBottom: "10px" }}
                          />
                          <Button
                            variant="contained"
                            onClick={() => setEditingImageIndex(null)}
                            sx={{
                              fontSize: "12px",
                              backgroundColor: "#1E90FF",
                              "&:hover": {
                                backgroundColor: "#d32f2f",
                              },
                              mt: 2,
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleDeleteImageByIndex(index)}
                            sx={{
                              fontSize: "12px",
                              backgroundColor: "#1E90FF",
                              "&:hover": {
                                backgroundColor: "#d32f2f",
                              },
                              mt: 2,
                            }}
                          >
                            Eliminar Imagen
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditarEquipo;
