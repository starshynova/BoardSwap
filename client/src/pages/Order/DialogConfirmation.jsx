import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OrderConfirmation from "./OrderConfirmation";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DialogConfirmation({ open, onClose }) {
  const navigate = useNavigate();
  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      navigate("/");
    }
    onClose();
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
        Your Order:
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
