import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import UserProfileUI from "../../components/UserProfileUI";

const UserProfile = () => {
  const { token, userId } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onReceived = (data) => {
    if (data.success) {
      setUser(data.result);
      setValue("name", data.result.name);
      setValue("email", data.result.email);
      setValue("city", data.result.city);
      setValue("post_code", data.result.post_code);
    } else {
      setError("User profile not found.");
    }
    setIsLoading(false);
  };

  const {
    isLoading: isFetching,
    error: fetchError,
    performFetch,
  } = useFetch(`/users/${userId}`, onReceived, null, token);

  useEffect(() => {
    if (!token || !userId) {
      setError("No token, please log in.");
      setIsLoading(false);
      return;
    }
    performFetch();
  }, [token, userId]);

  const onSubmit = async () => {
    try {
      if (!token) {
        throw new Error("No token, please log in.");
      }
      setShowConfirm(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (updatedUserData) => {
    try {
      if (!token) {
        throw new Error("No token, please log in.");
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const updatedData = await response.json();
      if (updatedData.success) {
        navigate(`/users/${userId}`);
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowConfirm(false);
    }
  };

  const confirmUpdate = async () => {
    const updatedUserData = {
      name: user.name,
      email: user.email,
      city: user.city,
      post_code: user.post_code,
    };
    handleUpdate(updatedUserData);
  };

  const handleDelete = async () => {
    try {
      if (!token) {
        throw new Error("No token, please log in.");
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const deletedData = await response.json();
      if (deletedData.success) {
        console.log("Deleted profile:", deletedData.msg);
        navigate("/login");
      } else {
        setError("Failed to delete profile.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const deleteUser = () => {
    handleDelete();
  };

  let content;
  if (isLoading || isFetching) {
    content = <div>Loading...</div>;
  } else if (error || fetchError) {
    content = <div>Error: {error || fetchError}</div>;
  } else if (user) {
    content = (
      <UserProfileUI
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        showConfirm={showConfirm}
        onSubmit={onSubmit}
        confirmUpdate={confirmUpdate}
        setShowConfirm={setShowConfirm}
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        deleteUser={deleteUser}
      />
    );
  } else {
    content = <p>User not found.</p>;
  }

  return <div>{content}</div>;
};

export default UserProfile;
