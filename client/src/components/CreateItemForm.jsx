import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { uploadImage } from "../util/uploadImage";
import formStyle from "../util/formStyle.js";

const CreateItemForm = (sellerId) => {
  const itemType = [
    { value: "Puzzle", label: "Puzzle" },
    { value: "Board Game", label: "Board Game" },
  ];

  const itemCondition = [
    { value: "New", label: "New" },
    { value: "Like New", label: "Like New" },
    { value: "Used", label: "Used" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: "",
    condition: "",
    photo_name: "",
    photo:
      "https://res.cloudinary.com/dogm5xki5/image/upload/v1742978122/qfsn7oqaob87rxurw5xq.jpg",
    description: "",
    status: "Available",
    seller_id: sellerId,
  });

  const [errors, setErrors] = useState({});

  const [fileName, setFileName] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const fileInputRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  console.log(formStyle);

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (!token) {
      console.error("No token. User not authorised.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setFormData((prev) => ({ ...prev, seller_id: decodedToken.id }));
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required field";
    }
    if (
      formData.price === "" ||
      formData.price === null ||
      formData.price === undefined
    ) {
      newErrors.price = "Price is required field";
    }
    if (formData.price < 0) {
      newErrors.price = "The price should be a positive number or 0";
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        photo: "You can upload only images (*.jpg, *.png, *.webp, *.gif)",
      }));
      return;
    }

    setFileName(file.name);
    setErrors((prev) => ({ ...prev, photo: "" }));

    try {
      const uploadedImg = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        photo_name: file.name,
        photo: uploadedImg,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      setErrors((prev) => ({ ...prev, photo: "Failed to upload image" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitSuccess(false);
      setSubmitError(false);
      const response = await fetch("/api/items/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: formData }),
      });
      if (!response.ok) {
        setSubmitError(true);
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error("Data sending error");
      }

      setFormData({
        title: "",
        price: "",
        type: "",
        condition: "",
        photo_name: "",
        photo:
          "https://res.cloudinary.com/dogm5xki5/image/upload/v1742978122/qfsn7oqaob87rxurw5xq.jpg",
        description: "",
        status: "Available",
        seller_id: "",
      });
      const createdItem = await response.json();
      setSubmitSuccess(true);

      timeoutRef.current = setTimeout(() => {
        navigate(`/items/${createdItem.item._id}`);
      }, 4000);
    } catch (error) {
      setSubmitError(true);
      console.error("Error:", error);
    }
  };

  const requiredFields = ["title", "price", "type", "condition"];
  const hasEmptyFields = requiredFields.some((field) => !formData[field]);

  const hasErrors = Object.values(errors).some((error) => error);

  return (
    <Box sx={formStyle.boxBig} noValidate autoComplete="off">
      <Typography variant="h5" textAlign="center" mb={2}>
        Add a new advert
      </Typography>
      <TextField
        required
        id="outlined-title"
        name="title"
        label="Title"
        sx={formStyle.input}
        onChange={(e) => {
          const value = e.target.value;

          setErrors((prevErrors) => ({
            ...prevErrors,
            title:
              value.length > 100
                ? "The title should not exceed 100 characters"
                : "",
          }));

          handleChange(e);
        }}
        value={formData.title}
        error={!!errors.title}
        helperText={errors.title}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />

      <TextField
        required
        id="outlined-price"
        name="price"
        label="Price"
        sx={formStyle.input}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          },
        }}
        onChange={handleChange}
        onInput={(e) => {
          const value = e.target.value;
          if (isNaN(value)) {
            setErrors({ ...errors, price: "Please enter a valid number" });
          } else if (Number(value) > 99999) {
            setErrors({ ...errors, price: "The number is too large" });
          } else {
            setErrors({ ...errors, price: "" });
          }
        }}
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
        sx={formStyle.input}
        helperText="Please select the category of your product"
        onChange={handleChange}
        value={formData.type}
        error={!!errors.type}
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
        name="condition"
        select
        label="Condition"
        sx={formStyle.input}
        helperText="Please select the condition of the product"
        onChange={handleChange}
        value={formData.condition}
        error={!!errors.condition}
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

      <div style={{ width: "100%" }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Box>
          <TextField
            label="Attach a file"
            value={fileName}
            sx={{ ...formStyle.input, flex: 1 }}
            onClick={() => fileInputRef.current.click()}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachFileIcon />
                  </InputAdornment>
                ),
              },
            }}
            fullWidth
          />
          {errors.photo && (
            <FormHelperText error>{errors.photo}</FormHelperText>
          )}
        </Box>
      </div>
      <TextField
        id="outlined-multiline-description"
        name="description"
        label="Description"
        sx={formStyle.input}
        multiline
        rows={4}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length > 300) {
            setErrors({
              ...errors,
              description: "The description should not exceed 300 characters",
            });
          } else {
            setErrors({ ...errors, description: "" });
          }
          handleChange(e);
        }}
        slotProps={{
          input: {
            maxLength: 300,
          },
        }}
        value={formData.description}
        error={!!errors.description}
        helperText={errors.description}
      />
      <Box sx={formStyle.center}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={formStyle.buttonSmall}
          onClick={handleSubmit}
          disabled={hasEmptyFields || hasErrors}
        >
          Submit
        </Button>

        {submitSuccess && (
          <Typography color="green" sx={{ mt: 2 }}>
            Your advert has been successfully added!
          </Typography>
        )}

        {submitError && (
          <Typography color="red" sx={{ mt: 2 }}>
            Oops! Something went wrong. Please, try again later!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CreateItemForm;
