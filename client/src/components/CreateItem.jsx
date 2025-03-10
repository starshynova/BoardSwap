import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
} from "@mui/material";

const CreateItem = () => {
  const itemType = [
    { value: "puzzle", label: "Puzzle" },
    { value: "boardgame", label: "Board Game" },
  ];

  const itemCondition = [
    { value: "new", label: "New" },
    { value: "likeNew", label: "Like New" },
    { value: "used", label: "Used" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: "40px",
        flexDirection: "column",
        width: "40vw",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-title"
        label="Title"
        sx={{ width: "100%" }}
        defaultValue=" "
      />
      <TextField
        required
        id="outlined-price"
        label="Price"
        sx={{ width: "100%" }}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          },
        }}
      />
      <TextField
        required
        id="outlined-select-product-type"
        select
        label="Product type"
        sx={{ width: "100%" }}
        defaultValue="None"
        helperText="Please select your product type"
      >
        {itemType.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        id="outlined-select-condition"
        select
        label="Condition"
        sx={{ width: "100%" }}
        defaultValue="None"
        helperText="Please select the condition of the product"
      >
        {itemCondition.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-photo"
        label="Photo"
        sx={{ width: "100%" }}
        defaultValue=" "
      />
      <TextField
        id="outlined-multiline-description"
        label="Description"
        sx={{ width: "100%" }}
        multiline
        rows={4}
        defaultValue=" "
      />
      <Button
        variant="contained"
        size="large"
        sx={{ width: "200px", backgroundColor: "rgba(220, 165, 4, 1)" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateItem;
