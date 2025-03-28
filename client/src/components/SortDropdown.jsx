import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";

const SortDropdown = ({ onSortChange, sortValue }) => {
  const theme = useTheme();

  const handleSortChange = useCallback(
    (e) => onSortChange(e.target.value),
    [onSortChange],
  );

  return (
    <FormControl sx={{ minWidth: 200, height: 40, backgroundColor: "white" }}>
      <InputLabel
        id="sort-label"
        sx={{
          transform: "translate(14px, 10px) scale(1)",
          "&.Mui-focused, &.MuiFormLabel-filled": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
          lineHeight: "1.5",
        }}
      >
        Sort by
      </InputLabel>
      <Select
        label="Sort by"
        labelId="sort-label"
        value={sortValue}
        onChange={handleSortChange}
        sx={{
          color: theme.palette.text.secondary,
          height: 40,
          "& .MuiSelect-select": {
            padding: "8px 14px",
          },
        }}
      >
        <MenuItem value="" sx={{ color: theme.palette.text.secondary }}>
          Default
        </MenuItem>
        <MenuItem
          value="price_asc"
          sx={{ color: theme.palette.text.secondary }}
        >
          Price: Low to High
        </MenuItem>
        <MenuItem
          value="price_desc"
          sx={{ color: theme.palette.text.secondary }}
        >
          Price: High to Low
        </MenuItem>
      </Select>
    </FormControl>
  );
};

SortDropdown.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  sortValue: PropTypes.string.isRequired,
};

export default SortDropdown;
