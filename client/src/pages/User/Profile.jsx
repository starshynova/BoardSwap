import { useState, useEffect } from "react";
import useForm from "../../hooks/useFetch";
import PropTypes from "prop-types";
import UserProfileUI from "../../components/UserProfileUI";

const UserProfile = ({ initialUserData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(initialUserData);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setUser(initialUserData);
  }, [initialUserData]);

  const onSubmit = (formData) => {
    setShowConfirm(true);
    setUser(formData);
  };

  const confirmUpdate = () => {
    console.log("Updated user data:", user);
    setShowConfirm(false);
  };

  return (
    <UserProfileUI
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      isLoading={false}
      showConfirm={showConfirm}
      onSubmit={onSubmit}
      confirmUpdate={confirmUpdate}
      setShowConfirm={setShowConfirm}
      user={user}
    />
  );
};

UserProfile.propTypes = {
  initialUserData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    post_code: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
