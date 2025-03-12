import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CenteredTabs({ onTabChange }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(event, newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="All" />
        <Tab label="Puzzles" />
        <Tab label="Board Games" />
      </Tabs>
    </Box>
  );
}
