import CreateItemForm from "../../components/CreateItemForm";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const CreateItem = () => {
  const token = localStorage.getItem("authToken");

  return (
    <>
      {!token ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              width: "40%",
              height: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000000",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <Typography variant="h5" textAlign="center">
              You should be <br />
              <Link to="/login">
                <Typography variant="h5" component="span" color="#47CAD1">
                  logged in
                </Typography>
              </Link>
            </Typography>
          </Box>
        </div>
      ) : (
        <CreateItemForm />
      )}
    </>
  );
};

export default CreateItem;
