import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import CreateUser from "./CreateUser";

const Register = () => {
  const navigate = useNavigate();

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

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          color="secondary"
          sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
        >
          Explore Games
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
