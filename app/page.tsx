"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/generated/prisma/client";
import Card from "@/components/ui/Card";
import CompanyPayment from "@/components/CompanyPayment";
import Invoice from "@/components/Invoice";

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
    <div className="grid grid-cols-[1fr_5fr_1fr] p-4 h-screen">
      <CompanyPayment />
      <div className="p-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="my-5 border p-2 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="grid h-70 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-x-hidden overflow-y-auto">
            {product.map((p) => (
              <Card product={p} key={p.id} />
            ))}
          </div>
          <Link
            href="/manage"
            className="absolute -top-5 right-10 font-semibold text-lg"
          >
            Manage
          </Link>
        </div>
        <Invoice />
      </div>

      <div className="border h-full">
        <h1 className="font-bold text-center my-2 text-lg">Paint Alert</h1>
      </div>
    </div>
  );
};

export default Page;

// 1 PAGEE SARE WAREHOUSE PRODUCTS ADD + MANGAE ( UPDATE , DELETE , EDIT )

// INVOICE GENERATE CUSTOMER  ( PRODUCTS LIST + PAYMENT )
// HISTORY ( DAYS ===> LIST CUSTOMERS  )
// DAY 1 --- DAY 10 ===> PRODUCTS ORDER MOST SOLD

// Monday , 8 August 2026 , Before Credits , Credits , After Credits , Company Member Name
