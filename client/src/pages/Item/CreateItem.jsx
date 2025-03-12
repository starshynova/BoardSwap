import CreateItemForm from "../../components/CreateItemForm";

const CreateItem = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("You need to be logged in to create an item");
    window.location.href = "/login";
  }
  return (
    <>
      <CreateItemForm />
    </>
  );
};

export default CreateItem;
