import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OrderConfirmation from "./OrderConfirmation";
import { Fragment, useState } from "react";

export default function AlertDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Order Confirmation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
