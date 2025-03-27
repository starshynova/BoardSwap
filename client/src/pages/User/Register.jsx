import { Box, Typography, Grid } from "@mui/material";
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
      <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            marginBottom: "16px",
            maxWidth: "600px",
            margin: "0 auto",
            marginTop: "50px",
          }}
        >
          Welcome to BoarSwap! Ready to trade, buy, or sell board games and
          puzzles? Join now and start your adventure!
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "-80px" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              textAlign: "left",
              width: "100%",
              mt: -2,
            }}
          >
            <CreateUser />
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" gap={2} mt={-2}>
        <ExploreGamesButton />
      </Box>
    </Box>
  );
};

export default Register;
