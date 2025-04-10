import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../Components/Firebase/Firebase";
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import style from "./EditarEquipos.module.css";
const EditarEquipo = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    description: "",
    images: [],
  });
  console.log("Estado equipoSeleccionado:", equipoSeleccionado);
  console.log("Estado editar:", editData);

  const [nameImage, setNameImage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (equipoSeleccionado) {
      setEditData({
        name: equipoSeleccionado.name || "",
        description: equipoSeleccionado.description || "",
        images: equipoSeleccionado.images || [],
        id: equipoSeleccionado.id,
      });
    }
  }, [equipoSeleccionado]);

  //////////////////////////////////////////////////////////////////

  const handleDeleteImageByIndex = async (index) => {
    if (!equipoSeleccionado || index === undefined || index < 0) return;
    console.log("Índice de imagen seleccionado:", index);
    try {
      const imageToDelete = equipoSeleccionado.images[index];
      if (!imageToDelete) return; // Verifica si la imagen existe
      console.log("imagen seleccionado:", imageToDelete);
      // Paso 1: Eliminar la imagen de Firebase Storage
      const imageRef = ref(storage, `${imageToDelete.name}`);

      await deleteObject(imageRef);

      // Paso 2: Eliminar la referencia a la imagen en Firestore
      const itemDoc = doc(db, "equipos", equipoSeleccionado.id);
      const updatedImages = equipoSeleccionado.images.filter(
        (_, i) => i !== index
      ); // Filtra la imagen por su índice
      await updateDoc(itemDoc, { images: updatedImages });

      // Paso 3: Actualizar el estado de Redux localmente
      setEditData((prevData) => ({
        ...prevData,
        images: updatedImages, // Actualizar el array sin la imagen eliminada
      }));
      dispatch(eliminarImagenPorIndice(index));

      // Mostrar mensaje de éxito
      setSnackbarMessage("Imagen eliminada con éxito");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error al eliminar la imagen: ", error);
      setSnackbarMessage("Error al eliminar la imagen");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true); // Mostrar Snackbar
    }
  };
  //////////////////////////////////////////////////////////////////
  const handleSave = async () => {
    if (!equipoSeleccionado) return;

    try {
      const itemDoc = doc(db, "equipos", equipoSeleccionado.id);
      await updateDoc(itemDoc, editData);
      setSnackbarMessage("Equipo actualizado con éxito");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error actualizando el equipo: ", error);
      setSnackbarMessage("Error al actualizar el equipo");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEditChange = (field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return;

    const storageRef = ref(storage, `images/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error al subir la imagen: ", error);
        setSnackbarMessage("Error al subir la imagen");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setEditData((prevData) => ({
          ...prevData,
          images: [
            ...prevData.images,
            { name: imageName || selectedImage.name, url: downloadURL },
          ],
        }));
        setSelectedImage(null);
        setImageName("");
        setSnackbarMessage("Imagen subida con éxito");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    );
  };

  /////////////////////////////////////////////////////
  function changeHandlerFile(event) {
    setFile(event.target.files[0]);
  }

  function changeHandlerName(event) {
    const newName = event.target.value;
    setNameImage(newName);
  }

  //////////////////////////////////////////////////////////

  if (!equipoSeleccionado) {
    return (
      <Typography variant="h6">
        No hay equipo seleccionado para editar.
      </Typography>
    );
  }

  const { name, description } = editData;

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
      <Typography
        variant="h5"
        sx={{
          color: "#8B3A3A",
          fontWeight: "bold",
          overflowWrap: "break-word",
          fontSize: { xs: "h5.fontSize", sm: "h4.fontSize" },
        }}
      >
        Descripcion:
        <Typography sx={{ color: "#00008B", marginBottom: 2 }}>
          {equipoSeleccionado.description}
        </Typography>
      </Typography>

      <Grid container spacing={0.5} justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Ingrese Nuevo nombre"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => handleEditChange("name", e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Ingrese Nueva descripción"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => handleEditChange("description", e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Nuevo nombre"
            type="text"
            readOnly
            value={name}
            fullWidth
            margin="normal"
            sx={{
              mt: 1,
              fontSize: "0.75rem",
              "& .MuiInputBase-input": {
                padding: "6px 12px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00008B",
                },
                "&:hover fieldset": {
                  borderColor: "#4682B4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1E90FF",
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Nueva descripción"
            type="text"
            readOnly
            value={description}
            fullWidth
            margin="normal"
            sx={{
              mt: 1,
              fontSize: "0.75rem",
              "& .MuiInputBase-input": {
                padding: "6px 12px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00008B",
                },
                "&:hover fieldset": {
                  borderColor: "#4682B4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1E90FF",
                },
              },
            }}
          />
        </Grid>

        <Grid container spacing={2}>
          {equipoSeleccionado.images && equipoSeleccionado.images.length > 0
            ? equipoSeleccionado.images.map((image, index) => (
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
                      <TextField
                        type="text"
                        readOnly
                        value={
                          image.name || `Nombre no disponible ${index + 1}`
                        }
                        fullWidth
                        margin="normal"
                        sx={{
                          mt: 1,
                          fontSize: "0.75rem",
                          "& .MuiInputBase-input": {
                            padding: "6px 12px",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#00008B",
                            },
                            "&:hover fieldset": {
                              borderColor: "#4682B4",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1E90FF",
                            },
                          },
                        }}
                      />
                      <TextField
                        type="text"
                        readOnly
                        value={image.url}
                        fullWidth
                        margin="normal"
                        sx={{
                          mt: 1,
                          fontSize: "0.75rem",
                          "& .MuiInputBase-input": {
                            padding: "6px 12px",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#00008B",
                            },
                            "&:hover fieldset": {
                              borderColor: "#4682B4",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1E90FF",
                            },
                          },
                        }}
                      />
                    </Box>
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
                      Eliminar Imagen {index + 1}
                    </Button>
                  </Box>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>

      <Grid container spacing={0.5} justifyContent="center">
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            {file ? (
              <img
                className={style.previewImage}
                src={file ? URL.createObjectURL(file) : ""}
                alt="Vista previa de la imagen"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            ) : (
              <Typography
                variant="h8"
                sx={{ color: "#8B3A3A", fontWeight: "bold" }}
              >
                Selecciona Primera Imagen.
              </Typography>
            )}
          </Box>
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
                  color: "#ffffff",
                  fontSize: "12px",
                  backgroundColor: "#1E90FF",
                  "&:hover": {
                    backgroundColor: "#4682B4",
                  },
                  mt: 2,
                }}
              >
                Selecciona Imagen
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              name="fotos"
              onChange={changeHandlerFile}
              style={{ display: "none" }}
            />
          </Box>
          <TextField
            type="text"
            name="name"
            onChange={changeHandlerName}
            value={nameImage}
            label="Nombre primera imagen"
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: {
                display: "flex",
                alignItems: "center",
                height: "100%",
                color: "#8B3A3A",
              },
            }}
            InputProps={{
              sx: {
                color: "#8B3A3A",
              },
            }}
            margin="normal"
            sx={{
              mt: 1,
              fontSize: "0.75rem",
              "& .MuiInputBase-input": {
                padding: "6px 12px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00008B",
                },
                "&:hover fieldset": {
                  borderColor: "#4682B4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1E90FF",
                },
              },
            }}
          />
          {/* <Button
            type="button"
            onClick={handleFileUpload}
            variant="contained"
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
              marginBottom: 2,
            }}
          >
            SUBIR IMAGENEn
          </Button> */}
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            {file ? (
              <img
                className={style.previewImage}
                src={file ? URL.createObjectURL(file) : ""}
                alt="Vista previa de la imagen"
                style={{
                  width: "100px",
                  height: "100px",
                  // objectFit: "cover",
                }}
              />
            ) : (
              <Typography
                variant="h8"
                sx={{ color: "#8B3A3A", fontWeight: "bold" }}
              >
                Selecciona Segunda Imagen.
              </Typography>
            )}
          </Box>
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
                  color: "#ffffff",
                  fontSize: "12px",
                  backgroundColor: "#1E90FF",
                  "&:hover": {
                    backgroundColor: "#4682B4",
                  },
                  mt: 2,
                }}
              >
                Selecciona Imagen
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              name="fotos"
              onChange={changeHandlerFile}
              style={{ display: "none" }}
            />
          </Box>
          <TextField
            type="text"
            name="name"
            onChange={changeHandlerName}
            value={nameImage}
            label="Nombre segunda imagen"
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: {
                display: "flex",
                alignItems: "center",
                height: "100%",
                color: "#8B3A3A",
              },
            }}
            InputProps={{
              sx: {
                color: "#8B3A3A",
              },
            }}
            margin="normal"
            sx={{
              mt: 1,
              fontSize: "0.75rem",
              "& .MuiInputBase-input": {
                padding: "6px 12px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00008B",
                },
                "&:hover fieldset": {
                  borderColor: "#4682B4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1E90FF",
                },
              },
            }}
          />
          {/* <Button
            type="button"
            onClick={handleFileUpload}
            variant="contained"
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
              marginBottom: 2,
            }}
          >
            SUBIR IMAGENEn
          </Button> */}
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            {file ? (
              <img
                className={style.previewImage}
                src={file ? URL.createObjectURL(file) : ""}
                alt="Vista previa de la imagen"
                style={{
                  width: "100px",
                  height: "100px",
                  // objectFit: "cover",
                }}
              />
            ) : (
              <Typography
                variant="h8"
                sx={{ color: "#8B3A3A", fontWeight: "bold" }}
              >
                Selecciona Tercera Imagen.
              </Typography>
            )}
          </Box>
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
                  color: "#ffffff",
                  fontSize: "12px",
                  backgroundColor: "#1E90FF",
                  "&:hover": {
                    backgroundColor: "#4682B4",
                  },
                  mt: 2,
                }}
              >
                Selecciona Imagen
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              name="fotos"
              onChange={changeHandlerFile}
              style={{ display: "none" }}
            />
          </Box>
          <TextField
            type="text"
            name="name"
            onChange={changeHandlerName}
            value={nameImage}
            label="Nombre tercera imagen"
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: {
                display: "flex",
                alignItems: "center",
                height: "100%",
                color: "#8B3A3A",
              },
            }}
            InputProps={{
              sx: {
                color: "#8B3A3A",
              },
            }}
            margin="normal"
            sx={{
              mt: 1,
              fontSize: "0.75rem",
              "& .MuiInputBase-input": {
                padding: "6px 12px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00008B",
                },
                "&:hover fieldset": {
                  borderColor: "#4682B4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1E90FF",
                },
              },
            }}
          />
          {/* <Button
            type="button"
            onClick={handleFileUpload}
            variant="contained"
            sx={{
              height: "45px",
              color: "#ffffff",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#4682B4",
              },
              marginBottom: 2,
            }}
          >
            SUBIR IMAGENEn
          </Button> */}
        </Grid>
      </Grid>
      {/* <input type="file" accept="image/*" onChange={handleImageChange} />
      <TextField
        label="Nombre de la imagen"
        variant="outlined"
        fullWidth
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleUploadImage}
          sx={{
            mt: 2,
            backgroundColor: "#1E90FF",
            "&:hover": { backgroundColor: "#4682B4" },
          }}
          fullWidth
        >
          Subir Imagen
        </Button>
      </Box> */}

      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          mb: 2,
          backgroundColor: "#1E90FF",
          "&:hover": { backgroundColor: "#4682B4" },
        }}
        fullWidth
      >
        Guardar Cambios
      </Button>
      {/* </Grid> */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditarEquipo;

{
  /* <Grid item xs={12} sm={6}>
          {url &&
            url.length > 0 &&
            url.map((image, index) => (
              <Box key={index} sx={{ textAlign: "center", mb: 2 }}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  URL: {image}
                </Typography>
              </Box>
            ))}
        </Grid> */
}

//formato de objeto
// {
//   id: 'y4fkUXnaBDTKlOrW36Fj',
//   name: 'Emma',
//   description: 'Ema y Annette ',
//   nameLowerCase: 'emma',
//   images: [
//     { name: 'Emma-1728749171219', url: 'https://firebasestorage.googleapis.com/v0/b/mi-neg…=media&token=f5da9663-402f-48b5-a550-c0dc719261c8' },
//     { name: 'Rey-1728749153293', url: 'https://firebasestorage.googleapis.com/v0/b/mi-neg…=media&token=90e62015-5a66-4178-bdba-369069f1ab39' },
//     { name: 'Yaz-1728749188037', url: 'https://firebasestorage.googleapis.com/v0/b/mi-neg…=media&token=7c5daace-7fcd-4caa-8520-a5643ec73fc3' }
//   ]
// }
