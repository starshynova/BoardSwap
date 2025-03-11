import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { useState} from "react";

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

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: "",
    condition: "",
    photo: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required field";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required field";
    }
    if (formData.price<0) {
      newErrors.price = "The price should be a positive number or 0"
    }
    if (!formData.type.trim()) {
      newErrors.type = "Category is required field";
    }
    if (!formData.condition.trim()) {
      newErrors.condition = "Condition is required field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Data sending error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        name="title" 
        label="Title"
        sx={inputStyles}
        onChange={handleChange}
        value={formData.title}
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        required
        id="outlined-price"
        name="price" 
        label="Price"
        sx={inputStyles}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          },
        }}
        onChange={handleChange}
        value={formData.price}
        error={!!errors.price}
        helperText={errors.price}
      />

      <TextField
        required
        id="outlined-select-category"
        name="type" 
        select
        label="Category"
        sx={inputStyles}
        helperText="Please select the category of your product"
        onChange={handleChange}
        value={formData.type}
        error={!!errors.type}
      >
        {itemType.map((option) => (
          <MenuItem sx={{color: "#000000"}} key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        required
        id="outlined-select-condition"
        name="condition" 
        select
        label="Condition"
        sx={inputStyles}
        helperText="Please select the condition of the product"
        onChange={handleChange}
        value={formData.condition}
        error={!!errors.condition}
      >
        {itemCondition.map((option) => (
          <MenuItem sx={{color: "#000000"}} key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="outlined-photo"
        name="photo" 
        label="Photo"
        sx={inputStyles}
        onChange={handleChange}
        value={formData.photo}
      />

      <TextField
        id="outlined-multiline-description"
        name="description" 
        label="Description"
        sx={inputStyles}
        multiline
        rows={4}
        onChange={handleChange}
        value={formData.description}
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
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateItemForm;
