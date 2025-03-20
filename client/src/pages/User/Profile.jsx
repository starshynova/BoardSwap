import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import UserProfileUI from "../../components/UserProfileUI";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { token, userId } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
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
      setError(data.msg || "User profile not found.");
    }
  };

  const {
    isLoading: fetchIsLoading,
    error: fetchError,
    performFetch,
  } = useFetch(`/users/${userId}`, onReceived, null, token);

  useEffect(() => {
    if (!token) {
      setError("Please log in to access your profile.");
      return;
    }
    performFetch();
  }, [token, userId]);

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
      await performFetch(options);
      setFeedbackMessage("Profile updated successfully!");

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    } catch (err) {
      setError(
        err.message || "Unable to update your profile. Please try again later.",
      );
      setFeedbackMessage("Error updating profile. Please try again.");

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
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
        console.log("Deleted profile:", deletedData.msg);
        navigate("/");
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
    <div>Loading...</div>
  ) : error || fetchError ? (
    <div style={{ color: "red", textAlign: "center" }}>
      {error || fetchError}
    </div>
  ) : user ? (
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
    />
  ) : (
    <p>User not found. Please try again later.</p>
  );

  return <div>{content}</div>;
};

export default UserProfile;
