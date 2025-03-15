import EditItemForm from "../../components/EditItemForm";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const EditItem = () => {
  const token = localStorage.getItem("authToken");
  return (
    <>
      {!token ? (
        <div
          style={{
            width: "50%",
            height: "50%",
            margin: "auto",
            marginTop: "20%",
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
        </div>
      ) : (
        <EditItemForm />
      )}
    </>
  );
};

export default EditItem;
