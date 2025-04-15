import React, { useState, useEffect, useRef } from "react";
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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
// import style from "./EditarEquipos.module.css";

const EditarEquipo = () => {
  const location = useLocation();
  const nameInputRef = useRef(null);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(
    () => location.state?.equipo || null
  );
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  console.log("Estado equipo Seleccionado:", equipoSeleccionado);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    images: [],
  });

  console.log("Estado Equipo Editado:", formData);
  useEffect(() => {
    if (equipoSeleccionado) {
      setFormData({
        id: equipoSeleccionado.id,
        name: equipoSeleccionado.name,
        description: equipoSeleccionado.description,
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

  const handleImputRestName = () => {
    setFormData((prev) => ({
      ...prev,
      name: equipoSeleccionado.name,
    }));
  };
  const handleImputRestDescription = () => {
    setFormData((prev) => ({
      ...prev,
      description: equipoSeleccionado.description,
    }));
  };

  const handleReplaceImage = (index, newFile) => {
    const newPreviewUrl = URL.createObjectURL(newFile);

    const updatedImages = [...formData.images];
    updatedImages[index] = {
      name: "",
      url: newPreviewUrl,
      file: newFile,
      isNew: true,
    };

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleChangeImageName = (index, newName) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = {
      ...updatedImages[index],
      name: newName,
    };

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleDeleteImageByIndex = (indexToDelete) => {
    const updatedImages = formData.images.filter((_, i) => i !== indexToDelete);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));

    if (editingImageIndex === indexToDelete) {
      setEditingImageIndex(null);
    }
  };

  const handleConfirmImageName = () => {
    if (editingImageIndex !== null) {
      const updatedImages = [...formData.images];
      updatedImages[editingImageIndex].name = tempImageName;
      setFormData((prev) => ({
        ...prev,
        images: updatedImages,
      }));
      setEditingImageIndex(null);
    }
  };

  // Esta función sube solo las imágenes nuevas (isNew: true)
  const subirImagenesNuevas = async (imagenesNuevas) => {
    const storage = getStorage();
    const subidas = [];

    for (const img of imagenesNuevas) {
      const storageRef = ref(storage, `imagenes/${img.file.name}`);
      await uploadBytes(storageRef, img.file);
      const url = await getDownloadURL(storageRef);

      subidas.push({
        name: img.name,
        url,
        file: null,
        isNew: false,
      });
    }

    return subidas;
  };

  // Esta función principal actualiza Firestore con los cambios
  const actualizarEquipoConCambios = async (formData, equipoId) => {
    try {
      const db = getFirestore();

      // Filtrar imágenes
      const imagenesNuevas = formData.images.filter((img) => img.isNew);
      const imagenesAntiguas = formData.images.filter((img) => !img.isNew);

      // Subir nuevas y combinar con las antiguas
      const nuevasSubidas = await subirImagenesNuevas(imagenesNuevas);
      const imagenesFinales = [...imagenesAntiguas, ...nuevasSubidas];

      // Armar los datos a guardar
      const datosActualizados = {
        name: formData.name,
        description: formData.description,
        images: imagenesFinales,
      };

      // Actualizar Firestore
      const equipoRef = doc(db, "equipos", equipoId);
      await updateDoc(equipoRef, datosActualizados);

      console.log("✅ Equipo actualizado con éxito.");
    } catch (error) {
      console.error("❌ Error al actualizar el equipo:", error);
    }
  };

  const [editingImageIndex, setEditingImageIndex] = useState(null);
  const [editingNameIndex, setEditingNameIndex] = useState(null);

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
      {/* <Typography sx={{ color: "#00008B", marginBottom: 2 }}>
        {equipoSeleccionado.name}
      </Typography>
      <Typography sx={{ color: "#00008B", marginBottom: 2 }}>
        {equipoSeleccionado.description}
      </Typography> */}

      <Grid container spacing={0.5} justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            inputRef={nameInputRef}
            name="name"
            // label="Editar Nombre"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Button
          variant="contained"
          onClick={() => {
            setFormData({ ...formData, name: "" });
            setTimeout(() => {
              nameInputRef.current?.focus(); // Coloca el cursor en el input
            }, 0); // Esperamos que el estado se actualice antes de enfocar
          }}
          sx={{
            fontSize: "12px",
            backgroundColor: "#1E90FF",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
            mt: 2,
          }}
        >
          Editar Nombre
        </Button>

        {/* <Button
          variant="contained"
          onClick={() => setFormData({ ...formData, name: "" })}
          sx={{
            fontSize: "12px",
            backgroundColor: "#1E90FF",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
            mt: 2,
          }}
        >
          Editar Nombre
        </Button> */}
        <Button
          variant="contained"
          onClick={handleImputRestName}
          sx={{
            fontSize: "12px",
            backgroundColor: "#1E90FF",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
            mt: 2,
          }}
        >
          Cancelar Edicion
        </Button>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            name="description"
            // label="Editar Descripción"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Button
          variant="contained"
          onClick={() => setFormData({ ...formData, description: "" })}
          sx={{
            fontSize: "12px",
            backgroundColor: "#1E90FF",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
            mt: 2,
          }}
        >
          Editar descripcion
        </Button>
        <Button
          variant="contained"
          onClick={handleImputRestDescription}
          sx={{
            fontSize: "12px",
            backgroundColor: "#1E90FF",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
            mt: 2,
            mb: 2,
          }}
        >
          Cancelar Edicion
        </Button>
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
                          onClick={() => {
                            setEditingImageIndex(index);
                            setTempImageName("");
                          }}
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
                          {editingNameIndex !== index ? (
                            <label
                              htmlFor={`file-upload-${index}`}
                              style={{ cursor: "pointer" }}
                            >
                              <input
                                id={`file-upload-${index}`}
                                type="file"
                                name="fotos"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    handleReplaceImage(index, file);
                                    setEditingNameIndex(index);
                                  }
                                }}
                                style={{ display: "none" }}
                              />
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
                          ) : (
                            <>
                              <TextField
                                label="Nombre de la imagen"
                                value={formData.images[index]?.name || ""}
                                onChange={(e) =>
                                  handleChangeImageName(index, e.target.value)
                                }
                                size="small"
                                sx={{ flexGrow: 1, mr: 2 }}
                              />
                            </>
                          )}
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
                          <Button
                            variant="contained"
                            onClick={() => {
                              const updatedImages = [...formData.images];
                              updatedImages[index] = {
                                name: equipoSeleccionado.images[index].name,
                                url: equipoSeleccionado.images[index].url,
                                file: null,
                                isNew: false,
                              };
                              setFormData((prev) => ({
                                ...prev,
                                images: updatedImages,
                              }));
                              setEditingImageIndex(null);
                              setEditingNameIndex(null);
                            }}
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

                          <Box sx={{ textAlign: "center", mt: 4 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleConfirmImageName;
                                setEditingImageIndex(null);
                                console.log("imagenes guardadas:", formData);
                              }}
                            >
                              Guardar Cambios
                            </Button>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))
            : null}
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              actualizarEquipoConCambios(formData, equipoSeleccionado.id);
              console.log("Datos guardados:", formData);
            }}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default EditarEquipo;
