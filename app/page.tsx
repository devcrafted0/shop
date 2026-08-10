"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/generated/prisma/client";
import Card from "@/components/ui/Card";
import CompanyPayment from "@/components/CompanyPayment";
import Invoice from "@/components/Invoice";
import AlertCard from "@/components/ui/AlertCard";
import { Cement, Others } from "@/components/CementOthers";

const Page = () => {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState<Product[]>([]);

  const [lowPaints, setLowPaints] = useState<Product[]>();
  const [lowCement, setLowCement] = useState<Product[]>();
  const [lowOthers, setLowOthers] = useState<Product[]>();

  const [selectedTab, setSelectedTab] = useState<"cement" | "others">("cement");

  const tabData: [
    { name: string; val: "cement" },
    { name: string; val: "others" },
  ] = [
    { name: "Cement", val: "cement" },
    { name: "Others", val: "others" },
  ];

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

      const lowCementAlerts = data.filter(
        (product: Product) =>
          product.product === "Cement" && product.amount < product.alertValue,
      );

      const lowOtherAlerts = data.filter(
        (product: Product) =>
          product.product !== "Paint" &&
          product.product !== "Cement" &&
          product.amount < product.alertValue,
      );

      setLowPaints(lowPaintAlerts);
      setLowCement(lowCementAlerts);
      setLowOthers(lowOtherAlerts);
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
            href="/mega-price-updater"
            className="absolute -top-5 right-60 font-semibold text-lg"
          >
            Price Updater
          </Link>
          <Link
            href="/manage"
            className="absolute -top-5 right-10 font-semibold text-lg"
          >
            Manage
          </Link>
          <Link
            href="/analysis"
            className="absolute -top-5 left-0 font-semibold text-lg"
          >
            Analysis
          </Link>
        </div>
        <div className="flex gap-5">
          <Invoice />

          <div className="border">
            <div className="flex">
              {tabData.map((c) => (
                <button
                  className={`mt-1 text-2xl font-bold text-foreground p-3 cursor-pointer hover:text-cyan-900 hover:drop-shadow-2xl ${selectedTab === c.val ? "text-cyan-700" : "text-black"}`}
                  onClick={() => setSelectedTab(c.val)}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {selectedTab === "cement" ? (
              <Cement lowCement={lowCement!} />
            ) : (
              <Others lowOthers={lowOthers!} />
            )}
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col border border-black bg-white p-4">
        {/* Header with pulsing alert indicator */}
        <div className="mb-2 flex items-center justify-between border-b border-black pb-3">
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
          <div className="flex flex-col gap-2 overflow-y-auto">
            {lowPaints.map((p, index) => (
              <AlertCard p={p} index={index} />
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
