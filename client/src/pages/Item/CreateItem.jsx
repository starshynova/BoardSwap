import CreateItemForm from "../../components/CreateItemForm";

const CreateItem = () => {
  const token = localStorage.getItem("authToken");

  return (
    <>
      {!token ? (
        <div>
          <p>You should be logged in</p>
        </div>
      ) : (
        <CreateItemForm />
      )}
    </>
  );
};

export default CreateItem;
