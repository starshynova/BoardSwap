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
    photo_name: "",
    photo:
      "https://res.cloudinary.com/dogm5xki5/image/upload/v1742978122/qfsn7oqaob87rxurw5xq.jpg",
    description: "",
    status: "Available",
    seller_id: sellerId,
  });

  const [errors, setErrors] = useState({});

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const fileInputRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

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

  const handleFileChange = (event) => {
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

    setSelectedFile(file);
    setFileName(file.name);
    setErrors((prev) => ({ ...prev, photo: "" }));
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    const uploadedImg = await uploadImage(selectedFile);
    setFormData({ ...formData, photo_name: fileName, photo: uploadedImg });
    setUploadSuccess(true);
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
        marginBottom: "40px",
        boxShadow: 3,
        borderRadius: 2,
        padding: "40px",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Add a new advert
      </Typography>
      <TextField
        required
        id="outlined-title"
        name="title"
        label="Title"
        sx={inputStyles}
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
        sx={inputStyles}
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
        sx={inputStyles}
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
        sx={inputStyles}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <TextField
              label="Attach a file"
              value={fileName}
              sx={{ ...inputStyles, flex: 1 }}
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
            <Button
              variant="contained"
              size="medium"
              color="black"
              sx={{
                width: "160px",
                height: "40px",
                mt: 2,
                backgroundColor: "#47CAD1",
                borderRadius: "10px",
              }}
              onClick={handleUploadClick}
              disabled={!selectedFile}
            >
              Upload
            </Button>
          </Box>
          {!errors.photo ? (
            <FormHelperText>
              * Choose a file and then click Upload
            </FormHelperText>
          ) : (
            <FormHelperText error>{errors.photo}</FormHelperText>
          )}
        </Box>

        {uploadSuccess && (
          <Typography color="green" sx={{ mt: 2 }}>
            Successful
          </Typography>
        )}
      </div>
      <TextField
        id="outlined-multiline-description"
        name="description"
        label="Description"
        sx={inputStyles}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            width: "200px",
            mt: 2,
            borderRadius: "10px",
          }}
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
