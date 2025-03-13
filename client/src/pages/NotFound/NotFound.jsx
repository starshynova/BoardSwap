import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h5" color="secondary" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ borderRadius: "10px" }}
      >
        Home Page
      </Button>
    </Box>
  );
};

export default NotFound;
