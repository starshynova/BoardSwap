import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

const UserProfileForm = ({ handleDelete, handleEdit }) => {
  const [isUser, setIsUser] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    post_code: "",
    city: "",
    items: [],
  });
  const { id } = useParams();
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

  useEffect(() => {
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.id === id) {
        setIsUser(true);
      }
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error("Data getting error");
      }
      const result = await response.json();
      setData(result.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchUser();
    console.log(data);
  }, [id, token]);

  console.log(id, data);

  return !isUser ? (
    <Box
      sx={{
        width: "40vw",
        height: "40vw",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
        boxShadow: 3,
        borderRadius: 2,
        padding: "40px",
      }}
    >
      <Typography variant="h5" color="#000000">
        It is not your profile
      </Typography>
    </Box>
  ) : (
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
        <ListItem sx={styleListItem}>
          <Typography variant="h6" fontWeight="bold">
            Name
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", left: "160px" }}>
            {data.name}
          </Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        <ListItem sx={styleListItem}>
          <Typography variant="h6" fontWeight="bold">
            E-mail
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", left: "160px" }}>
            {data.email}
          </Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        <ListItem sx={styleListItem}>
          <Typography variant="h6" fontWeight="bold">
            Post code
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", left: "160px" }}>
            {data.post_code}
          </Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
        <ListItem sx={styleListItem}>
          <Typography variant="h6" fontWeight="bold">
            City
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", left: "160px" }}>
            {data.city}
          </Typography>
        </ListItem>
        <Divider component="li" sx={styleDivider} />
      </List>
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
    </Box>
  );
};

UserProfileForm.propTypes = {
  // isInCart: PropTypes.bool.isRequired,
  // toggleCartItem: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  // deleteSuccess: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default UserProfileForm;
