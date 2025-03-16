import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useCallback } from "react";

export default function CenteredTabs({ onTabChange, selectedType }) {
  const typeToIndex = { All: 0, Puzzle: 1, "Board Game": 2 };
  const indexToType = ["All", "Puzzle", "Board Game"];
  const handleTabChange = useCallback(
    (event, newValue) => onTabChange(event, indexToType[newValue]),
    [onTabChange, indexToType],
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", mb: 4 }}>
      <Tabs
        value={typeToIndex[selectedType]}
        onChange={handleTabChange}
        centered
      >
        <Tab label="All" />
        <Tab label="Puzzles" />
        <Tab label="Board Games" />
      </Tabs>
    </Box>
  );
}

CenteredTabs.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
};
