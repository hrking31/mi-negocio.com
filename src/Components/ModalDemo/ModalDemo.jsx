import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function ModalDemo({ open, onClose }) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <InfoIcon  />
          Acceso Demo
        </DialogTitle>

        <DialogContent>
          <DialogContentText component="div">
            <Box>
              <Typography variant="body1">
                <strong>Usuario:</strong> admin@gmail.com
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 2, fontStyle: "italic"}}
              >
                Usa esta usuario para acceder como administrador.
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 3, fontWeight: "bold"}}
              >
                ¡Crea tu producto y comienza a probar la app!
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                🛠️ ¡Pruébala completamente! Cada sección fue pensada para
                ofrecer una experiencia real de administración de contenido.
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="contained" >
            Empezar Demo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
