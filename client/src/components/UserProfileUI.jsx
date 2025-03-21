import {
  TextField,
  Button,
  Box,
  Typography,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

const UserProfileUI = ({
  errors,
  register,
  handleSubmit,
  isLoading,
  showConfirm,
  setShowConfirm,
  showDeleteConfirm,
  setShowDeleteConfirm,
  updateProfile,
  handleDelete,
  feedbackMessage,
  error,
}) => {
  const onSubmit = () => {
    setShowConfirm(true);
  };

  const handleConfirmUpdate = () => {
    setShowConfirm(false);
    handleSubmit(updateProfile)();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "350px",
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        mb={2}
        sx={{ fontWeight: "bold" }}
      >
        Update Profile
      </Typography>

      {error && (
        <Typography
          variant="body2"
          textAlign="center"
          color="error"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          {error}
        </Typography>
      )}

      {feedbackMessage && (
        <Typography
          variant="body2"
          textAlign="center"
          color={feedbackMessage.includes("Error") ? "error" : "success"}
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          {feedbackMessage}
        </Typography>
      )}

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
        }}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
        }}
      />

      <TextField
        label="City"
        fullWidth
        margin="normal"
        {...register("city", {
          maxLength: {
            value: 50,
            message: "City name cannot exceed 15 characters",
          },
        })}
        error={!!errors.city}
        helperText={errors.city?.message}
        sx={{
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
        }}
      />

      <TextField
        label="Post Code"
        fullWidth
        margin="normal"
        {...register("post_code", {
          validate: (value) =>
            value === "" ||
            /^[0-9]{4}[a-zA-Z]{2}$/.test(value) ||
            "Invalid post code format. Example: 1234AB",
        })}
        error={!!errors.post_code}
        helperText={errors.post_code?.message}
        sx={{
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: "#47CAD1",
          borderRadius: "10px",
        }}
        disabled={isLoading}
      >
        Update
      </Button>

      {isLoading && <LinearProgress sx={{ mt: 2 }} />}

      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmUpdate}
            sx={{
              backgroundColor: "#47CAD1",
              borderRadius: "10px",
              color: "#000000",
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outlined"
            sx={{ borderRadius: "10px", color: "#000000" }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        onClick={() => setShowDeleteConfirm(true)}
        variant="outlined"
        color="error"
        fullWidth
        sx={{
          mt: 2,
          borderRadius: "10px",
        }}
      >
        Delete Profile
      </Button>

      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText color="error">
            Are you sure you want to permanently delete your account and data?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: "10px" }}
          >
            Yes, Delete
          </Button>
          <Button
            onClick={() => setShowDeleteConfirm(false)}
            variant="outlined"
            sx={{ borderRadius: "10px" }}
          >
            No, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

UserProfileUI.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showConfirm: PropTypes.bool.isRequired,
  setShowConfirm: PropTypes.func.isRequired,
  showDeleteConfirm: PropTypes.bool.isRequired,
  setShowDeleteConfirm: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  feedbackMessage: PropTypes.string,
  error: PropTypes.string,
};

export default UserProfileUI;
