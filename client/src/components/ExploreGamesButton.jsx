import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExploreGamesButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/")}
      variant="outlined"
      color="secondary"
      sx={{
        px: 4,
        py: 1.5,
        fontSize: "1rem",
        fontWeight: "bold",
        backgroundColor: "white",
      }}
    >
      Explore Games
    </Button>
  );
};

export default ExploreGamesButton;
