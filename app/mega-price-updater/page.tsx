import { megaPriceUpdater } from "@/actions/mega-price-updater";
import { db } from "@/utils/db";

const Page = async () => {
  const customProduct = await db.customProduct.findMany();
  const customProductCompany = await db.productCompany.findMany();
  const customProductType = await db.productType.findMany();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold text-2xl">Mega Price Updater</h1>
      <form
        action={megaPriceUpdater}
        className="border flex flex-col gap-2 p-5"
      >
        <div className="flex gap-3 items-center">
          <label htmlFor="product">Product :</label>
          <select name="product" id="product">
            {customProduct.map((c) => (
              <option value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="company">Company :</label>
          <select name="company" id="company">
            {customProductCompany.map((c) => (
              <option value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="type">Type :</label>
          <select name="type" id="type">
            {customProductType.map((c) => (
              <option value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="size">Size :</label>
          <select name="size" id="size">
            <option value="TINLET">TINLET</option>
            <option value="QUARTER">QUARTER</option>
            <option value="GALLON">GALLON</option>
            <option value="DRUM">DRUM</option>
            <option value="FULL">FULL</option>
          </select>
        </div>

        <div className="flex gap-3 items-center">
          <label htmlFor="new-actual-price">New Actual Price :</label>
          <input
            className="border p-1"
            type="number"
            name="new-actual-price"
            id="new-actual-price"
            required
          />
        </div>

        <div className="flex justify-center items-center">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
