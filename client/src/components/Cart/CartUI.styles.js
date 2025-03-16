import { Box, styled } from "@mui/material";
import Drawer from "@mui/material/Drawer";

export const DrawerCard = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 450,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  },
}));

export const CartItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  marginBottom: "10px",
}));

export const ProductImage = styled("img")({
  width: 70,
  height: 70,
  borderRadius: 8,
  objectFit: "cover",
  marginRight: 15,
});
