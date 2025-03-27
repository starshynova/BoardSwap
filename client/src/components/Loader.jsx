import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PacmanLoader color={"#47CAD1"} size={25} />
    </div>
  );
};

export default Loader;
