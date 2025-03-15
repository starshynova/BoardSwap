import ItemDetailsForm from "../../components/ItemDetailsForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUIContext } from "../../context/UIContext";

const ItemDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useUIContext();
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
            Authorization: `Bearer ${token}`,
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

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!data) return <h2>Item not found</h2>;

  return (
    <ItemDetailsForm
      data={data}
      isInCart={cart.some((item) => item._id === data._id)}
      toggleCartItem={toggleCartItem}
    />
  );
};

export default ItemDetails;
