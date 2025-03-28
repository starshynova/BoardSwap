import ItemDetailsForm from "../../components/ItemDetailsForm";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useUIContext } from "../../context/UIContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import Loader from "../../components/Loader.jsx";

const ItemDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { cart, setCart } = useUIContext();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/items/${id}`,
    (response) => {
      setData(response.result);
    },
  );

  const toggleCartItem = (item) => {
    setCart((prevCart) => {
      const isAlreadyInCart = prevCart.some(
        (product) => product._id === item._id,
      );
      return isAlreadyInCart
        ? prevCart.filter((product) => product._id !== item._id)
        : [...prevCart, item];
    });
  };

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error("Data deleting error");
      }
      setDeleteSuccess(true);
      timeoutRef.current = setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/items/edit/${id}`);
  };

  if (isLoading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (!data) return <h2>Item not found</h2>;

  return (
    <ItemDetailsForm
      data={data}
      isInCart={cart.some((item) => item._id === data._id)}
      toggleCartItem={toggleCartItem}
      handleDelete={handleDelete}
      deleteSuccess={deleteSuccess}
      handleEdit={handleEdit}
    />
  );
};

export default ItemDetails;
