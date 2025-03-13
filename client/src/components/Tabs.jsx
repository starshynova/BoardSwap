import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// eslint-disable-next-line react/prop-types
export default function CenteredTabs({ onTabChange, selectedType }) {
  const typeToIndex = { All: 0, Puzzle: 1, "Board Game": 2 };
  const indexToType = ["All", "Puzzle", "Board Game"];

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={typeToIndex[selectedType]}
        onChange={(event, newValue) =>
          onTabChange(event, indexToType[newValue])
        }
        centered
      >
        <Tab label="All" />
        <Tab label="Puzzles" />
        <Tab label="Board Games" />
      </Tabs>
    </Box>
  );
}
