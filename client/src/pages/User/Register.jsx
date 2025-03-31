import { Box, Typography } from "@mui/material";
import CreateUser from "./CreateUser";
import ExploreGamesButton from "../../components/ExploreGamesButton";

const Register = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{
          textAlign: "center",
          marginTop: "15px",
          maxWidth: "800px",
        }}
      >
        Welcome to BoarSwap!
        <br />
        Ready to trade, buy, or sell board games and puzzles?
        <br />
        Join now and start your adventure!
      </Typography>

      <Box
        sx={{
          borderRadius: 2,
          textAlign: "center",
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          marginBottom: "40px",
        }}
      >
        <CreateUser />
      </Box>

      <ExploreGamesButton />
    </Box>
  );
};

export default Register;
