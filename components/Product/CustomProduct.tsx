import addCustomProduct from "@/actions/addCustomProduct";

const CustomProduct = () => {
  return (
    <form action={addCustomProduct}>
      <label htmlFor="customProduct">Custom Product :</label>
      <input
        type="text"
        name="customProduct"
        id="customProduct"
        className="border ml-2"
      />
    </form>
  );
};

export default CustomProduct;
