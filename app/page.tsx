import { createPaint } from "@/actions/add-paint";

const Page = () => {
  return (
    <div>
      <form action={createPaint}>
        <h2>Add Paint</h2>

        <div>
          <label htmlFor="name">Paint Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter paint name"
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="company">Company</label>
          <br />
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Enter company name"
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="color">Color</label>
          <br />
          <input
            type="text"
            id="color"
            name="color"
            placeholder="Enter color"
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="colorCode">Color Code</label>
          <br />
          <input
            type="text"
            id="colorCode"
            name="colorCode"
            placeholder="e.g. B-204"
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="quarter">Quarter Stock</label>
          <br />
          <input
            type="number"
            id="quarter"
            name="quarter"
            min={0}
            defaultValue={0}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="gallon">Gallon Stock</label>
          <br />
          <input
            type="number"
            id="gallon"
            name="gallon"
            min={0}
            defaultValue={0}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="small">Small Stock</label>
          <br />
          <input
            type="number"
            id="small"
            name="small"
            min={0}
            defaultValue={0}
            required
          />
        </div>

        <br />

        <button type="submit">Add Paint</button>
      </form>
    </div>
  );
};

export default Page;
