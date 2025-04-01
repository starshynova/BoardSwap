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
import formStyle from "../util/formStyle";

const token = localStorage.getItem("authToken");

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
    <Box>
      <Box
        sx={{
          ...formStyle.boxBig,
          maxWidth: "1000px",
          marginTop: "20px",
          display: "flex",
          gap: 4,
        }}
      >
        <Typography variant="h4" textAlign="left">
          {data.title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Box sx={{ flexShrink: 0, alignSelf: "center" }}>
            <ImageListItem sx={{ width: "300px" }}>
              <img
                src={data.photo}
                alt={data.title}
                style={{ width: "100%", height: "auto" }}
              />
            </ImageListItem>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <List sx={formStyle.list}>
              <ListItem sx={formStyle.listItem}>
                <Box sx={{ width: "160px" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Price
                  </Typography>
                </Box>
                <Typography variant="h6">{data.price} €</Typography>
              </ListItem>
              <Divider component="li" sx={formStyle.divider} />

              <ListItem sx={formStyle.listItem}>
                <Box sx={{ width: "160px" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Category
                  </Typography>
                </Box>
                <Typography variant="h6">{data.type}</Typography>
              </ListItem>
              <Divider component="li" sx={formStyle.divider} />

              <ListItem sx={formStyle.listItem}>
                <Box sx={{ width: "160px" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Condition
                  </Typography>
                </Box>
                <Typography variant="h6">{data.condition}</Typography>
              </ListItem>
              <Divider component="li" sx={formStyle.divider} />

              {data.description && (
                <Box style={{ width: "100%" }}>
                  <ListItem
                    sx={{
                      ...formStyle.listItem,
                      alignItems: "flex-start",
                      display: "block",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        wordBreak: "break-word",
                        flex: 1,
                        textAlign: "justify",
                      }}
                    >
                      {data.description}
                    </Typography>
                  </ListItem>
                </Box>
              )}
            </List>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!isSeller ? (
                <Button
                  variant={isInCart ? "outlined" : "contained"}
                  color={isInCart ? "secondary" : "primary"}
                  onClick={() => toggleCartItem(data)}
                  sx={formStyle.buttonSmall}
                  size="large"
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </Button>
              ) : (
                <Box sx={{ display: "flex", gap: "40px" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    sx={formStyle.buttonSmall}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={formStyle.buttonSmall}
                    size="large"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </Box>
              )}
              {deleteSuccess && (
                <Typography color="green" sx={{ mt: 2 }}>
                  Item was successfully deleted
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>{" "}
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
