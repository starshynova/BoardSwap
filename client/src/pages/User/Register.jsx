import { Box } from "@mui/material";
import CreateUser from "./CreateUser";
import ExploreGamesButton from "../../components/ExploreGamesButton";
import Heading from "../../components/Heading";

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
      <Heading
        sx={{
          textAlign: "center",
          marginTop: "15px",
          maxWidth: "800px",
        }}
      >
        Welcome to BoardSwap! Discover and trade second-hand board games and
        puzzles. Save money, reduce waste, and give games a second life! Join
        now and start swapping!
      </Heading>

      <Box
        sx={{
          borderRadius: 2,
          textAlign: "center",
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
        }}
      >
        <CreateUser />
      </Box>

      <ExploreGamesButton />
    </Box>
  );
};

export default Register;
