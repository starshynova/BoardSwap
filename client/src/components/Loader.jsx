import FadeLoader from "react-spinners/FadeLoader";

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
      <FadeLoader color={"#47CAD1"} size={25} />
    </div>
  );
};

export default Loader;
