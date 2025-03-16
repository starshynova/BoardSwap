import {
  TextField,
  Button,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import PropTypes from "prop-types";

const UserProfileUI = ({
  errors,
  register,
  handleSubmit,
  isLoading,
  showConfirm,
  onSubmit,
  confirmUpdate,
  setShowConfirm,
}) => {
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
      <Typography variant="h5" textAlign="center" mb={2}>
        Update Profile
      </Typography>

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
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email",
          },
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
        {...register("city")}
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
        {...register("post_code")}
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

      {showConfirm && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body1">
            Are you sure you want to update your profile?
          </Typography>
          <Button
            onClick={confirmUpdate}
            variant="contained"
            sx={{
              backgroundColor: "#47CAD1",
              borderRadius: "10px",
              mt: 1,
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outlined"
            sx={{
              mt: 1,
              borderRadius: "10px",
            }}
          >
            No
          </Button>
        </Box>
      )}
    </Box>
  );
};

UserProfileUI.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showConfirm: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  confirmUpdate: PropTypes.func.isRequired,
  setShowConfirm: PropTypes.func.isRequired,
};

export default UserProfileUI;
