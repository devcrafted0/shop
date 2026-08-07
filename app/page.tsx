"use client";

import { useEffect, useState } from "react";

type Paint = {
  id: number;
  name: string;
  company: string;
  color: string;
  colorCode: string;
  quarter: number;
  gallon: number;
  small: number;
};

const Page = () => {
  const [query, setQuery] = useState("");
  const [paints, setPaints] = useState<Paint[]>([]);

  useEffect(() => {
    const fetchPaints = async () => {
      const res = await fetch(
        `/api/paint/search?query=${encodeURIComponent(query)}`,
      );

      const data = await res.json();

      setPaints(data);
    };

    fetchPaints();
  }, [query]);

  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Search..."
        className="my-5 border p-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div>
        {paints.map((paint) => (
          <div key={paint.id} className="border p-3 mb-3">
            <h2>{paint.name}</h2>

            <p>Company: {paint.company}</p>

            <p>Color: {paint.color}</p>

            <p>Code: {paint.colorCode}</p>

            <p>
              Quarter: {paint.quarter} | Gallon: {paint.gallon} | Small:{" "}
              {paint.small}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
