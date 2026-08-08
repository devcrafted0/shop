import addCustomProduct from "@/actions/customProduct/addCustomProduct";
import { deleteCustomProduct } from "@/actions/customProduct/deleteCustomProduct";

import { type CustomProduct } from "@/generated/prisma/client";

const CustomProduct = ({ data }: { data: CustomProduct[] }) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Custom Products</h2>

        <form action={addCustomProduct} className="mt-5">
          <div className="flex w-full max-w-md flex-col gap-2">
            <label
              htmlFor="customProduct"
              className="text-sm font-medium text-gray-700"
            >
              Add Custom Product
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                name="customProduct"
                id="customProduct"
                placeholder="Enter product name"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />

              <button
                type="submit"
                className="shrink-0 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:bg-gray-700"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      <ul className="flex flex-col gap-3">
        {data.map((d) => (
          <li key={d.id}>
            <form
              action={deleteCustomProduct}
              className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <input type="hidden" name="id" value={d.id} />

              <span className="truncate font-medium text-gray-800">
                {d.name}
              </span>

              <button
                type="submit"
                className="shrink-0 rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 active:bg-red-700"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomProduct;