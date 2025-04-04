import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const Heading = ({ children }) => {
  return (
    <Typography
      variant="h5"
      align="center"
      color="secondary"
      gutterBottom
      sx={{ py: "10px", px: "10px", textAlign: "center", maxWidth: "800px" }}
    >
      {children}
    </Typography>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;
