"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/generated/prisma/client";
import ProductCard from "@/components/ui/ProductCard";

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

        <div className="grid grid-cols-6 gap-5 h-100 overflow-scroll">
          {product.map((p) => (
            <ProductCard product={p} key={p.id} />
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
