import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const DeleteConfirmationDialog = ({ open, onClose, onConfirmDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      <DialogContentText color="red">
        Are you sure you want to permanently delete this item? This action
        cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="contained" color="primary">
        No, Cancel
      </Button>
      <Button onClick={onConfirmDelete} variant="contained" color="error">
        Yes, Delete
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

export default DeleteConfirmationDialog;
