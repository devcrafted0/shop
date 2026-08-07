import { createPaint } from "@/actions/add-paint";

const Page = () => {
  return (
    <div className="w-full p-7">
      <h1 className="text-3xl font-bold text-center">Manage</h1>
      <div className="w-full grid grid-cols-2">
        <form
          action={createPaint}
          className="border p-5 m-5 rounded text-center"
        >
          <h2 className="text-xl font-bold text-center my-4">Add Paint</h2>

          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-4 items-center ">
              <label htmlFor="name">Paint Name :</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter paint name"
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="company">Company :</label>

              <input
                type="text"
                id="company"
                name="company"
                placeholder="Enter company name"
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="color">Color :</label>

              <input
                type="text"
                id="color"
                name="color"
                placeholder="Enter color"
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="colorCode">Color Code :</label>

              <input
                type="text"
                id="colorCode"
                name="colorCode"
                placeholder="e.g. B-204"
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="quarter">Quarter Stock :</label>

              <input
                type="number"
                id="quarter"
                name="quarter"
                min={0}
                defaultValue={0}
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="gallon">Gallon Stock :</label>

              <input
                type="number"
                id="gallon"
                name="gallon"
                min={0}
                defaultValue={0}
                required
                className="border p-2 rounded"
              />
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="small">Tinlet Stock :</label>

              <input
                type="number"
                id="small"
                name="small"
                min={0}
                defaultValue={0}
                required
                className="border p-2 rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-2 p-2 my-5 cursor-pointer hover:text-white hover:bg-black"
          >
            Add Paint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
