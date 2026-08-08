"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/generated/prisma/client";

const Page = () => {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPaints = async () => {
      const res = await fetch(
        `/api/product/search?query=${encodeURIComponent(query)}`,
      );

      const data = await res.json();

      setProduct(data);
    };

    fetchPaints();
  }, [query]);

  return (
    <div className="grid grid-cols-1 p-4">
      {/* <div className="border">Company Member</div> */}
      <div className="p-5">
        <input
          type="text"
          placeholder="Search..."
          className="my-5 border p-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div>
          {product.map((product) => (
            <div key={product.id} className="border p-3 mb-3">
              <h2>{product.name}</h2>

              <p>Company: {product.company}</p>
              <p>Color: {product.name}</p>
              <p>Code: {product.code}</p>

              <p>Amount: {product.amount}</p>
              <p>Size: {product.size}</p>
            </div>
          ))}
        </div>

        <Link href="/manage">Manage</Link>
      </div>
      {/* <div className="border">Paint Alert</div> */}
    </div>
  );
};

export default Page;

// 1 PAGEE SARE WAREHOUSE PRODUCTS ADD + MANGAE ( UPDATE , DELETE , EDIT )
// INVOICE GENERATE CUSTOMER  ( PRODUCTS LIST + PAYMENT )
// HISTORY ( DAYS ===> LIST CUSTOMERS  )
// DAY 1 --- DAY 10 ===> PRODUCTS ORDER MOST SOLD
