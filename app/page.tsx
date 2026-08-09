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

  const [lowPaints, setLowPaints] = useState<Product[]>();

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

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/product/get-all-products`);

      const data = await res.json();

      const lowPaintAlerts = data.filter(
        (product: Product) =>
          product.product === "Paint" && product.amount < product.alertValue,
      );

      setLowPaints(lowPaintAlerts);
    };

    fetchProducts();
  }, []);

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

      <div className="flex h-full flex-col border border-black bg-white p-4">
        {/* Header with pulsing alert indicator */}
        <div className="mb-4 flex items-center justify-between border-b border-black pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
            </span>
            <h2 className="text-base font-bold tracking-tight text-black">
              Paint Alerts
            </h2>
          </div>

          <span className="border border-black bg-zinc-100 px-2 py-0.5 font-mono text-xs font-bold text-black">
            {lowPaints?.length || 0} LOW STOCK
          </span>
        </div>

        {/* Product Alerts List */}
        {lowPaints && lowPaints.length > 0 ? (
          <div className="flex flex-col gap-2.5 overflow-y-auto">
            {lowPaints.map((p, index) => (
              <div
                key={p.id || p.id || index}
                className="flex flex-col justify-between border border-black bg-white p-3 transition-colors hover:bg-zinc-50"
              >
                {/* Top Row: Name, Company & Current Stock */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black">{p.name}</span>
                      <span className="border border-zinc-300 px-1.5 py-0.2 text-[10px] font-semibold text-zinc-600 uppercase">
                        {p.company}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{p.type}</p>
                  </div>

                  {/* Stock Count vs Alert Badge */}
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-red-600">
                      {p.amount}{" "}
                      <span className="text-xs font-normal text-zinc-500">
                        left
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400">
                      Threshold: {p.alertValue}
                    </span>
                  </div>
                </div>

                {/* Bottom Meta Row: Code & Size */}
                <div className="mt-2.5 flex items-center justify-between border-t border-zinc-200 pt-2 font-mono text-xs">
                  <span className="text-zinc-600">
                    Code: <strong className="text-black">{p.code}</strong>
                  </span>

                  <span className="border border-black bg-black px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
                    Size: {p.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
              All paint inventory levels normal
            </p>
          </div>
        )}
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
