import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import UserProfileUI from "../../components/UserProfileUI";
import Loader from "../../components/Loader";

const UserSettings = () => {
  const { token, userId, logout } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading: fetchIsLoading, performFetch } = useFetch(
    `/users/${userId}`,
    (data) => {
      if (data.success) {
        setValue("name", data.result.name);
        setValue("email", data.result.email);
        setValue("city", data.result.city);
        setValue("post_code", data.result.post_code);
        setIsDataFetched(true);
      } else {
        setError(data.msg || "User profile not found.");
        setFeedbackMessage(null);
      }
    },
    null,
    token,
  );

  useEffect(() => {
    if (!token) {
      setError("Please log in to access your profile.");
      return;
    }

    if (!isDataFetched) {
      performFetch();
    }
  }, [token, userId, isDataFetched, performFetch]);

  const updateProfile = async (data) => {
    setIsLoading(true);
    setError(null);
    setFeedbackMessage(null);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`/api/users/${userId}`, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }

      await response.json();
      setFeedbackMessage("Profile updated successfully!");

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);

      setError(null);
    } catch (err) {
      setError(
        err.message || "Unable to update your profile. Please try again.",
      );
      setFeedbackMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      setError("Please log in to delete your account.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "Unable to delete your profile. Please try again later.",
        );
      }

      const deletedData = await response.json();
      if (deletedData.success) {
        logout();
      } else {
        setError("We couldn't delete your profile. Please try again later.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const content = fetchIsLoading ? (
    <Loader />
  ) : (
    <UserProfileUI
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      showConfirm={showConfirm}
      setShowConfirm={setShowConfirm}
      showDeleteConfirm={showDeleteConfirm}
      setShowDeleteConfirm={setShowDeleteConfirm}
      updateProfile={updateProfile}
      handleDelete={handleDelete}
      feedbackMessage={feedbackMessage}
      error={error}
    />
  );

  return <div>{content}</div>;
};

export default UserSettings;
