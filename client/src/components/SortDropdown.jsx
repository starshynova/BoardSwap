import { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

// eslint-disable-next-line react/prop-types
function SortDropdown({ items }) {
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [sortedItems, setSortedItems] = useState(items);

  const handleChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);

    let sortedArray = [...items];

    if (selectedSortOrder === "lowToHigh") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (selectedSortOrder === "highToLow") {
      sortedArray.sort((a, b) => b.price - a.price);
    }

    setSortedItems(sortedArray);
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="sort-label">Sort by Price</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-dropdown"
          value={sortOrder}
          label="Sort by Price"
          onChange={handleChange}
        >
          <MenuItem value="lowToHigh">Lowest Price</MenuItem>
          <MenuItem value="highToLow">Highest Price</MenuItem>
        </Select>
      </FormControl>

      <div>
        <h2>Sorted Items:</h2>
        <p>This is dummy data, I will remove it after backend implementation</p>
        <ul>
          {sortedItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SortDropdown;
