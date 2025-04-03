import PropTypes from "prop-types";
import { Button } from "@mui/material";

const EditButton = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={onClick}
      sx={{ marginTop: "auto", borderWidth: "2px" }}
    >
      Edit
    </Button>
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
