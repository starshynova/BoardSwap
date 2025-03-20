import UserProfileForm from "../../components/UserProfile/UserProfileForm";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = () => {
    navigate("/");
  };
  return (
    <UserProfileForm handleEdit={handleEdit} handleDelete={handleDelete} />
  );
};

export default UserProfile;
