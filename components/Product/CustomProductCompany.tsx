import addCustomProductCompany from "@/actions/addCustomProductCompany";

const CustomProductCompany = () => {
  return (
    <form action={addCustomProductCompany}>
      <label htmlFor="customProductCompany">Custom Product Company :</label>
      <input
        type="text"
        name="customProductCompany"
        id="customProductCompany"
        className="border ml-2"
      />
    </form>
  );
};

export default CustomProductCompany;
