import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartContador() {
  const items = useSelector((state) => state.cart.items);

  return (
    <Box >
      <ShoppingCartIcon />

      {items.length > 0 && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "5%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            width: 18,
            height: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: "bold",
          }}
        >
          {items.length}
        </Typography>
      )}
    </Box>
  );
}
