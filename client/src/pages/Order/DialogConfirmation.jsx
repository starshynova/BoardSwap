import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OrderConfirmation from "./OrderConfirmation";
import PropTypes from "prop-types";
import { Alert, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../../context/UIContext";

export default function DialogConfirmation({ open, onClose }) {
  const { setCart } = useUIContext();

  const navigate = useNavigate();
  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      navigate("/");
    }
    onClose();
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="order-confirmation-title"
      fullWidth
    >
      <DialogTitle id="order-confirmation-title" color="black">
        <Alert severity="success">Payment Submitted Successfully!</Alert>
        <Typography sx={{ mt: 2, padding: "10px 20px" }} variant="h6">
          Your Order:
        </Typography>
      </DialogTitle>
      <DialogContent>
        <OrderConfirmation />
      </DialogContent>
    </Dialog>
  );
}

DialogConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
