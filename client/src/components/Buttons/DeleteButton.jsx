import PropTypes from "prop-types";
import { Button } from "@mui/material";

const DeleteButton = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      color="error"
      size="small"
      onClick={onClick}
      sx={{ marginTop: "auto", borderWidth: "2px" }}
    >
      Delete
    </Button>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
