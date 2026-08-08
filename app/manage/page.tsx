import { createProduct } from "@/actions/createProduct";
import { db } from "@/utils/db";

import CustomProduct from "@/components/Product/CustomProduct";
import CustomProductCompany from "@/components/Product/CustomProductCompany";
import CustomProductType from "@/components/Product/CustomProductType";

const Page = async () => {
  const customProduct = await db.customProduct.findMany();
  const customProductType = await db.productType.findMany();
  const customProductCompany = await db.productCompany.findMany();

  return (
    <div className="w-full p-7">
      <h1 className="text-3xl font-bold text-center">Manage</h1>

      <div className="w-full grid grid-cols-2">
        <form
          action={createProduct}
          className="border p-5 m-5 rounded text-center"
        >
          <h2 className="text-xl font-bold text-center my-4">Add Product</h2>

          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-4 items-center ">
              <label htmlFor="product">Product :</label>

              <select name="product" id="product">
                {customProduct.map((c) => (
                  <option value={c.name} key={`${c.id}`}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 items-center ">
              <label htmlFor="type">Product type :</label>

              <select name="type" id="type">
                {customProductType.map((c) => (
                  <option value={c.name} key={`${c.id}`}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="company">Company :</label>

              <select name="company" id="company">
                {customProductCompany.map((c) => (
                  <option value={c.name} key={`${c.id}`}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="name">Name :</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="code">code :</label>

              <input
                type="text"
                id="code"
                name="code"
                placeholder="e.g. B-204"
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="amount">Amount :</label>

              <input
                type="number"
                id="amount"
                name="amount"
                min={0}
                defaultValue={0}
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="size">Size :</label>

              <select name="size" id="size">
                <option value="TINLET">TINLET</option>
                <option value="QUARTER">QUARTER</option>
                <option value="GALLON">GALLON</option>
                <option value="DRUM">DRUM</option>
                <option value="FULL">FULL</option>
              </select>
            </div>
          </div>
          <button type="submit" className="p-2 my-5">
            Add Paint
          </button>
        </form>
      </div>

      <div className="grid grid-cols-3">
        <CustomProduct data={customProduct} />
        <CustomProductType data={customProductType} />
        <CustomProductCompany data={customProductCompany} />
      </div>
    </div>
  );
};

export default Page;
