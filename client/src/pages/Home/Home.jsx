import TEST_ID from "./Home.testid";
import CenteredTabs from "../../components/Tabs";
// import SortDropdown from "../../components/SortDropdown";
import PropTypes from "prop-types";
import ProductsPage from "../../components/ProductsPage";
import Cart from "../../components/cart";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <div>
        <CenteredTabs />
        {/* <SortDropdown /> */}
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
