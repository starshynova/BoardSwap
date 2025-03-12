import PropTypes from "prop-types";

const LoadingErrorMessage = ({ isLoading, error }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return null;
};

LoadingErrorMessage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default LoadingErrorMessage;
