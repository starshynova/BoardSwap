import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

const CreateItemForm = () => {
  const itemType = [
    { value: "puzzle", label: "Puzzle" },
    { value: "boardgame", label: "Board Game" },
  ];

  const itemCondition = [
    { value: "new", label: "New" },
    { value: "likeNew", label: "Like New" },
    { value: "used", label: "Used" },
  ];

  const inputStyles = {
    width: "100%",
    borderRadius: "5px",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#D6F9FA",
      borderRadius: "5px",
    },
    "& .MuiInputBase-input": {
      color: "#000000",
    },
    "& .MuiFormHelperText-root": {
      backgroundColor: "transparent",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "40px",
        flexDirection: "column",
        width: "50vw",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
        boxShadow: 3,
        borderRadius: 2,
        padding: "40px",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Add a new announcement
      </Typography>
      <TextField
        required
        id="outlined-title"
        label="Title"
        sx={{
          width: "100%",
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
        }}
        defaultValue=" "
      />
      <TextField
        required
        id="outlined-price"
        label="Price"
        sx={{
          width: "100%",
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
        }}
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
        sx={inputStyles}
        defaultValue="None"
        helperText="Please select your product type"
      >
        {itemType.map((option) => (
          <MenuItem
            sx={{ color: "#000000" }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        id="outlined-select-condition"
        select
        label="Condition"
        sx={inputStyles}
        defaultValue="None"
        helperText="Please select the condition of the product"
      >
        {itemCondition.map((option) => (
          <MenuItem
            sx={{ color: "#000000" }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-photo"
        label="Photo"
        sx={inputStyles}
        defaultValue=" "
      />
      <TextField
        id="outlined-multiline-description"
        label="Description"
        sx={inputStyles}
        multiline
        rows={4}
        defaultValue=" "
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          width: "200px",
          mt: 2,
          backgroundColor: "#47CAD1",
          borderRadius: "10px",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateItemForm;
