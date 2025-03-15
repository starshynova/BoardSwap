import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box, Typography } from "@mui/material";

const ProfilePage = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">
          Please log in to view your profile.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4"> Profile Page!</Typography>
    </Box>
  );
};

export default ProfilePage;
