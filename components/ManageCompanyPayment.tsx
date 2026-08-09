import { createCompanyPayment } from "@/actions/companyPayment/createCompanyPayment";
import { deleteCompanyPayment } from "@/actions/companyPayment/deleteCompanyPayment";
import { db } from "@/utils/db";

const ManageCompanyPayment = async () => {
  const companyPayment = await db.companyPayment.findMany();
  return (
    <div className="flex gap-15 pt-15 mt-15 border-t">
      <div className="flex flex-col gap-5 w-100">
        <h1 className="font-bold text-2xl">Company Payment</h1>
        <p className="text-gray-500">Manage your company payment</p>

        <form
          action={createCompanyPayment}
          className="flex flex-wrap items-end gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex min-w-48 flex-1 flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="flex min-w-40 flex-col gap-1.5">
            <label htmlFor="day" className="text-sm font-medium text-gray-700">
              Day
            </label>

            <select
              name="day"
              id="day"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className="flex w-32 flex-col gap-1.5">
            <label
              htmlFor="credits"
              className="text-sm font-medium text-gray-700"
            >
              Credits
            </label>

            <input
              type="number"
              name="credits"
              id="credits"
              placeholder="0"
              min={0}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg px-5 py-2 text-sm font-medium transition"
          >
            Add
          </button>
        </form>
      </div>

      <ul className="flex flex-col gap-3">
        {companyPayment.map((d) => (
          <li key={d.id}>
            <form
              action={deleteCompanyPayment}
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

export default ManageCompanyPayment;
