import PropTypes from "prop-types";
import Loader from "./Loader";

const LoadingErrorMessage = ({ isLoading, error }) => {
  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return null;
};

LoadingErrorMessage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default LoadingErrorMessage;
