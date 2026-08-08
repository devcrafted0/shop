"use client";
import ProductCard from "@/components/ui/ProductCard";
import { type Product } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPaints = async () => {
      const res = await fetch(
        `/api/product/search?query=${encodeURIComponent(query)}`,
      );

      const data = await res.json();

      setProducts(data);
    };

    fetchPaints();
  }, [query]);

  return (
    <form action="" className="border p-5 m-5 rounded flex flex-col">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h2 className="text-xl font-bold my-4">Item List</h2>

      <div className="grid grid-cols-3 gap-5 h-100 overflow-scroll">
        {products.map((p) => (
          <ProductCard product={p} />
        ))}
      </div>
    </form>
  );
};

export default ProductList;
