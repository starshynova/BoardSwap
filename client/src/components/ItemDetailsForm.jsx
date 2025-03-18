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
  // width: "100%",
  display: "flex",
  position: "relative",
  gap: "20px",
  alignItems: "center",
};

const ItemDetailsForm = ({
  data,
  isInCart,
  toggleCartItem,
  handleDelete,
  deleteSuccess,
  handleEdit,
}) => {
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
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
        <Typography variant="h4" textAlign="center" mb={2}>
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

        <ListItem sx={{ ...styleListItem, mt: 5 }}>
          <Box sx={{ width: "160px" }}>
            <Typography variant="h6" fontWeight="bold">
              Price
            </Typography>
          </Box>
          <Typography variant="h6">{data.price} €</Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        <ListItem sx={styleListItem}>
          <Box sx={{ width: "160px" }}>
            <Typography variant="h6" fontWeight="bold">
              Category
            </Typography>
          </Box>

          <Typography variant="h6">{data.type}</Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        <ListItem sx={styleListItem}>
          <Box sx={{ width: "160px" }}>
            <Typography variant="h6" fontWeight="bold">
              Condition
            </Typography>
          </Box>
          <Typography variant="h6">{data.condition}</Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />

        {data.description && (
          <Box style={{ width: "100%" }}>
            <ListItem sx={{ ...styleListItem, alignItems: "flex-start" }}>
              <Box sx={{ width: "160px", flexShrink: 0 }}>
                <Typography variant="h6" fontWeight="bold">
                  Description
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ wordBreak: "break-word", flex: 1 }}
              >
                {data.description}
              </Typography>
            </ListItem>
            <Divider component="li" sx={styleDivider} />
          </Box>
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
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "200px", borderRadius: "10px" }}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
      )}
      {deleteSuccess && (
        <Typography color="green" sx={{ mt: 2 }}>
          Item was successfully deleted
        </Typography>
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
  handleDelete: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default ItemDetailsForm;
