import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OrderConfirmation from "./OrderConfirmation";
import { Fragment } from "react";
import PropTypes from "prop-types";

export default function AlertDialog({ open, onClose }) {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="order-confirmation-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="order-confirmation-title">
          Order Confirmation
        </DialogTitle>
        <DialogContent>
          <OrderConfirmation />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
