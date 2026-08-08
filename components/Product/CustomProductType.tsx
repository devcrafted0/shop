import addproductType from "@/actions/addCustomProductType";

const ProductType = () => {
  return (
    <form action={addproductType}>
      <label htmlFor="productType">Custom Product Type :</label>
      <input
        type="text"
        name="productType"
        id="productType"
        className="border ml-2"
      />
    </form>
  );
};

export default ProductType;
