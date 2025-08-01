import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Alert,
  Modal,
  Snackbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector  } from "react-redux";
import { addToCart } from "../../Store/Slices/cartSlice.js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DatosClienteModal from "../DatosClienteModal/DatosClienteModal.jsx";

export default function ProductCardDetail({ product }) {
  const dispatch = useDispatch();
  const cliente = useSelector((state) => state.cliente);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(1);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [valorTemp, setValorTemp] = useState(1);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenModal = (type) => {
    setActiveModal(type);
    if (type === "days") {
      setValorTemp(days);
    } else if (type === "quantity") {
      setValorTemp(quantity);
    }
  };

  const handleCloseModal = () => setActiveModal(null);

  const handleSaveModal = () => {
    if (valorTemp < 1 || isNaN(valorTemp)) {
      setValorTemp(1);
      return;
    }

    if (activeModal === "days") {
      setDays(valorTemp);
    } else if (activeModal === "quantity") {
      setQuantity(valorTemp);
    }

    handleCloseModal();
  };

  const handleAgregarAlCarrito = () => {
    const datosClienteVacios =
      ["nombre", "identificacion", "tipo"].every(
        (campo) => (cliente[campo] ?? "").trim() === ""
      ) &&
      (cliente.direccion && typeof cliente.direccion === "object"
        ? Object.values(cliente.direccion).every(
            (v) => (v ?? "").trim?.() === ""
          )
        : true);

    if (datosClienteVacios) {
      setModalAbierto(true);
    } else {
      handleAdd();
    }
  };

  const handleAdd = () => {
    const newItem = { ...product, quantity, days };

    const storedCart = JSON.parse(localStorage.getItem("cart")) || {
      items: [],
    };

    const exists = storedCart.items.some((item) => item.id === newItem.id);

    if (!exists) {
      const updatedItems = [...storedCart.items, newItem];
      localStorage.setItem("cart", JSON.stringify({ items: updatedItems }));
      dispatch(addToCart(newItem));
      setSnackbarMessage("Producto agregado al carrito");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("El producto ya está en el carrito");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
    }
  };

  const handleIncrement = (setValue, value) => () => setValue(value + 1);
  const handleDecrement = (setValue, value) => () =>
    setValue(value > 1 ? value - 1 : 1);

  const ControlBox = ({ type, value, setValue }) => (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          onClick={handleDecrement(setValue, value)}
          disableRipple
          sx={{
            minWidth: { xs: 28 },
            height: { xs: 28 },
            borderRadius: "50%",
            padding: 0,
            minHeight: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <Remove
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.secondary.light,
            }}
          />
        </Button>

        <Typography
          variant="body2"
          onClick={() => handleOpenModal(type)}
          sx={{ width: 32, textAlign: "center" }}
        >
          {value}
        </Typography>

        <Button
          onClick={handleIncrement(setValue, value)}
          disableRipple
          sx={{
            minWidth: { xs: 28 },
            height: { xs: 28 },
            padding: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <Add
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.secondary.light,
            }}
          />
        </Button>
      </Stack>
    </Box>
  );

  if (!product) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={4} sx={{ mb: 4 }} justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body2" sx={{ mb: 1 }}>
            Días
          </Typography>

          <Box
            sx={{
              border: "1px solid",
              borderRadius: 2,
              px: 1.5,
              minHeight: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ControlBox
              value={days}
              setValue={setDays}
              type="days"
              handleOpenModal={handleOpenModal}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body2" sx={{ mb: 1 }}>
            Cantidad
          </Typography>

          <Box
            sx={{
              border: "1px solid",
              borderRadius: 2,
              px: 1.5,
              minHeight: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ControlBox
              value={quantity}
              setValue={setQuantity}
              type="quantity"
              handleOpenModal={handleOpenModal}
            />
          </Box>
        </Box>
      </Stack>

      <Box sx={{ textAlign: "center", pb: 2 }}>
        <>
          <Button variant="success" onClick={handleAgregarAlCarrito}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="button">Agregar al</Typography>
              <ShoppingCartIcon
                color={
                  theme.palette.mode === "light"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light
                }
              />
            </Box>
          </Button>

          <DatosClienteModal
            modoAdmin
            open={modalAbierto}
            onClose={() => setModalAbierto(false)}
            onSuccess={() => {
              setModalAbierto(false);
              handleAdd();
            }}
          />
        </>
      </Box>

      <Modal open={Boolean(activeModal)} onClose={handleCloseModal}>
        <Box
          sx={{
            bgcolor: "background.default",
            p: 4,
            width: { xs: 350, sm: 400 },
            borderRadius: 2,
            mx: "auto",
            mt: "20vh",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Editar {activeModal === "days" ? "dias" : "cantidad"}
          </Typography>

          <TextField
            type="number"
            inputProps={{ min: 1 }}
            value={valorTemp || ""}
            onChange={(e) => setValorTemp(Number(e.target.value))}
            label={activeModal === "days" ? "Dias" : "Cantidad"}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="success" onClick={handleSaveModal} fullWidth>
            Guardar
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "&.MuiSnackbar-root": {
            position: "fixed",
            top: "50% !important",
            left: "50% !important",
            transform: "translate(-50%, -50%)",
            zIndex: 1300,
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: "100%",
            bgcolor: (theme) =>
              theme.palette[snackbarSeverity]?.main ||
              theme.palette.primary.main,
            color: (theme) =>
              theme.palette[snackbarSeverity]?.contrastText ||
              theme.palette.primary.contrastText,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
