import ItemDetailsForm from "../../components/ItemDetailsForm";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useUIContext } from "../../context/UIContext";
import { useNavigate } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { cart, setCart } = useUIContext();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const token = localStorage.getItem("authToken");

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
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.success) {
          setData(result.result);
        } else {
          setError("Error loading data");
        }
      } catch (error) {
        setError("Request error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
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

  if (loading) return <h2>Loading...</h2>;
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
