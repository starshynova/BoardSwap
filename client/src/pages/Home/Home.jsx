import TEST_ID from "./Home.testid";
import CenteredTabs from "../../components/Tabs";
import SortDropdown from "../../components/SortDropdown";
import ProductsPage from "../../components/ProductsPage";
import Cart from "../../components/cart";

// This is dummy data, I'll remove it after backend implementation
const items = [
  {
    id: 1,
    title: "Jigsaw Puzzle - Ocean Wonders",
    price: 15.99,
    type: "Puzzle",
    condition: "New",
  },
  {
    id: 2,
    title: "Monopoly Classic Edition",
    price: 29.99,
    type: "Board Game",
    condition: "Like New",
  },
  {
    id: 3,
    title: "Scrabble",
    price: 18.5,
    type: "Board Game",
    condition: "Used",
  },
  {
    id: 4,
    title: "Puzzle - Forest Adventure",
    price: 12.0,
    type: "Puzzle",
    condition: "New",
  },
  {
    id: 5,
    title: "Clue Board Game",
    price: 22.75,
    type: "Board Game",
    condition: "Like New",
  },
];

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <div>
        <CenteredTabs />
        <SortDropdown items={items} />
        <ProductsPage />
        <Cart />
      </div>
    </div>
  );
};

export default Home;
