import ItemDetailsForm from "../../components/ItemDetailsForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`);
        const result = await response.json();
        if (result.success) {
          setData(result.result);
          console.log(result.result);
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

  return <ItemDetailsForm data={data} />;
};

export default ItemDetails;
