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
import formStyle from "../util/formStyle";

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
      sx={formStyle.boxBig}
    >
      <Typography
        variant="h5"
        textAlign="center"
        mb={1}
        sx={{ fontWeight: "bold" }}
      >
        Update Profile
      </Typography>

      {error && (
        <Typography
          variant="body2"
          textAlign="center"
          color="error"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          {error}
        </Typography>
      )}

      {feedbackMessage && (
        <Typography
          variant="body2"
          textAlign="center"
          color={feedbackMessage.includes("Error") ? "error" : "success"}
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          {feedbackMessage}
        </Typography>
      )}

      <TextField
        label="Name"
        fullWidth
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={formStyle.input}
      />

      <TextField
        label="Email"
        fullWidth
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={formStyle.input}
      />

      <TextField
        label="City"
        fullWidth
        {...register("city", {
          maxLength: {
            value: 50,
            message: "City name cannot exceed 15 characters",
          },
        })}
        error={!!errors.city}
        helperText={errors.city?.message}
        sx={formStyle.input}
      />

      <TextField
        label="Post Code"
        fullWidth
        {...register("post_code", {
          validate: (value) =>
            value === "" ||
            /^[0-9]{4}[a-zA-Z]{2}$/.test(value) ||
            "Invalid post code format. Example: 1234AB",
        })}
        error={!!errors.post_code}
        helperText={errors.post_code?.message}
        sx={formStyle.input}
      />
      <Box style={{ display: "flex", gap: "40px" }}>
        <Button
          onClick={() => setShowDeleteConfirm(true)}
          variant="outlined"
          color="error"
          fullWidth
          sx={formStyle.buttonSmall}
          size="large"
        >
          Delete Profile
        </Button>

        <Dialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
        >
          <Box sx={formStyle.dialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText color="error">
                Are you sure you want to permanently delete your account and
                data? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                size="large"
                sx={formStyle.buttonSmall}
              >
                Yes, Delete
              </Button>
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                variant="outlined"
                sx={formStyle.buttonSmall}
                size="large"
              >
                No, Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          sx={formStyle.buttonSmall}
          disabled={isLoading}
        >
          Update
        </Button>

        {isLoading && <LinearProgress sx={{ mt: 2 }} />}

        <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
          <Box sx={formStyle.dialog}>
            <DialogTitle>Confirm Update</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to update your profile?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowConfirm(false)}
                variant="outlined"
                sx={formStyle.buttonSmall}
                size="large"
              >
                No
              </Button>
              <Button
                onClick={handleConfirmUpdate}
                sx={formStyle.buttonSmall}
                size="large"
                variant="contained"
              >
                Yes
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
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
