import TEST_ID from "./Home.testid";
import CenteredTabs from "../../components/Tabs";
import SortDropdown from "../../components/SortDropdown";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductsPage from "../../components/ProductsPage";
import Cart from "../../components/cart";

const Home = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let url = import.meta.env.VITE_BACKEND_URL + "/api/items";
        if (searchQuery) {
          url += `/search?q=${searchQuery}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setItems(data.result);
          setError(null);
        } else {
          setItems([]);
          setError(data.msg);
        }
      } catch (err) {
        setItems([]);
        setError("Failed to fetch items:", err);
      }
    };

    fetchItems();
  }, [searchQuery]);

  return (
    <div data-testid={TEST_ID.container}>
      <div>
        <CenteredTabs />
        <SortDropdown items={items} />
        <div>
          <h2>{searchQuery ? `Results for "${searchQuery}"` : `All Items`}</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {searchQuery && items.length === 0 && !error && (
            <p style={{ color: "gray" }}>There are no matched items.</p>
          )}
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <p>{item.title}</p>
                <p>Price: {item.price}</p>
                <p>Type: {item.type}</p>
                <p>Condition: {item.condition}</p>
                <p>Description: {item.description}</p>
                <br />
              </li>
            ))}
          </ul>
        </div>
        <ProductsPage />
        <Cart />
      </div>
    </div>
  );
};

Home.propTypes = {
  searchQuery: PropTypes.string,
};
export default Home;
