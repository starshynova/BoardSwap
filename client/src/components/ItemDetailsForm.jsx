import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ImageListItem,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("authToken");
const style = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderColor: "divider",
};

const styleDivider = {
  width: "100%",
  borderBottomWidth: "2px",
  borderColor: "#47CAD1",
};

const styleListItem = {
  display: "flex",
  position: "relative",
  gap: "40px",
};

const ItemDetailsForm = ({ data, isInCart, toggleCartItem }) => {
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      console.log("decodedToken", decodedToken);
      if (decodedToken.id === data.seller_id) {
        setIsSeller(true);
      }
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }, []);

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
        borderRadius: 10,
        padding: "40px",
      }}
    >
      <List sx={style}>
        <Typography variant="h3" textAlign="center" mb={2}>
          {data.title}
        </Typography>
        {data.photo ? (
          <ImageListItem sx={{ width: "300px" }}>
            <img src={data.photo} alt={data.title} />
          </ImageListItem>
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "160px",
              height: "160px",
              boxShadow: "3",
              borderRadius: "6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h7" textAlign="center">
              No image
            </Typography>
          </Box>
        )}

        <ListItem sx={styleListItem}>
          <Typography variant="h6" fontWeight="bold">
            Price
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", left: "160px" }}>
            {data.price} €
          </Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        <ListItem sx={styleListItem}>
          <Typography variant="h6" fontWeight="bold">
            Category
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", left: "160px" }}>
            {data.type}
          </Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        <ListItem sx={styleListItem}>
          <Typography variant="h6" fontWeight="bold">
            Condition
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", left: "160px" }}>
            {data.condition}
          </Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        {data.description && (
          <div style={{ width: "100%" }}>
            <ListItem sx={{ ...styleListItem, width: "100%" }}>
              <Typography variant="h6" fontWeight="bold">
                Description
              </Typography>
              <Typography
                variant="h6"
                sx={{ position: "absolute", left: "160px" }}
              >
                {data.description}
              </Typography>
            </ListItem>
            <Divider component="li" sx={styleDivider} />
          </div>
        )}
      </List>

      {!isSeller ? (
        <Button
          variant="contained"
          color={isInCart ? "error" : "primary"}
          onClick={() => toggleCartItem(data)}
          sx={{ mt: 2, width: "200px", borderRadius: "10px" }}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      ) : (
        <div style={{ display: "flex", gap: "40px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "200px", borderRadius: "10px" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "200px", borderRadius: "10px" }}
          >
            Edit
          </Button>
        </div>
      )}
    </Box>
  );
};

ItemDetailsForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    description: PropTypes.string,
    seller_id: PropTypes.string.isRequired,
  }).isRequired,
  isInCart: PropTypes.bool.isRequired,
  toggleCartItem: PropTypes.func.isRequired,
};

export default ItemDetailsForm;
