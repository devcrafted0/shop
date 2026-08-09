"use client";

import * as React from "react";
import { X, Plus, Loader2, ChevronDown, Search } from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface Product {
  id: number;
  product: string;
  type: string;
  company: string;
  name: string;
  code: string;
  amount: number;
  size: "FULL" | "HALF" | "QUARTER" | string;
  actualPrice: number;
}

interface ProductRow {
  rowId: string;
  productId: number | null;
  name: string;
  code: string;
  quantity: number;
  price: number;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const emptyRow = (): ProductRow => ({
  rowId: crypto.randomUUID(),
  productId: null,
  name: "",
  code: "",
  quantity: 1,
  price: 0,
  triggerRef: React.createRef<HTMLButtonElement>(),
});

function Invoice() {
  const [description, setDescription] = React.useState("");
  const [rows, setRows] = React.useState<ProductRow[]>([emptyRow()]);
  const [availableProducts, setAvailableProducts] = React.useState<Product[]>(
    [],
  );
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [openPickerRowId, setOpenPickerRowId] = React.useState<string | null>(
    null,
  );

  const [sellPrice, setSellPrice] = React.useState<number>(0);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/product/get-all-products");
        if (!res.ok) throw new Error("Failed to load products");
        const data: Product[] = await res.json();
        setAvailableProducts(data);
      } catch {
        setError("Could not load products list.");
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  React.useEffect(() => {
    console.log({ rows });
  }, [rows]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "z") {
        event.preventDefault();

        addRow();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // const sellPrice = rows.reduce((sum, r) => sum + r.quantity * r.price, 0);

  const selectProduct = (rowId: string, product: Product) => {
    setRows((prev) =>
      prev.map((r) =>
        r.rowId === rowId
          ? {
              ...r,
              productId: product.id,
              name: `${product.name} (${product.code}) (${product.size}) (${product.company})`,
              code: product.code,
              price: product.actualPrice,
            }
          : r,
      ),
    );
    setOpenPickerRowId(null);
  };

  const updateQuantity = (rowId: string, value: string) => {
    const qty = Number(value.replace(/^0+(?=\d)/, "")) || 0;
    setRows((prev) =>
      prev.map((r) => (r.rowId === rowId ? { ...r, quantity: qty } : r)),
    );
  };

  // const updatePrice = (rowId: string, value: string) => {
  //   const prc = Number(value.replace(/^0+(?=\d)/, "")) || 0;
  //   setRows((prev) =>
  //     prev.map((r) => (r.rowId === rowId ? { ...r, price: prc } : r)),
  //   );
  // };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);

  const removeRow = (rowId: string) =>
    setRows((prev) =>
      prev.length > 1 ? prev.filter((r) => r.rowId !== rowId) : prev,
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    if (rows.some((r) => !r.productId)) {
      setError("Every row needs a selected product.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          products: rows.map(({ productId, name, code, quantity, price }) => ({
            id: productId,
            name,
            code,
            amount: quantity,
            price,
          })),
          sellPrice,
        }),
      });

      if (!res.ok) throw new Error("Failed to create invoice");

      setDescription("");
      setRows([emptyRow()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-w-xl border border-border bg-card p-3 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="mt-1 text-2xl font-bold text-foreground">
          Create Invoice
        </h2>
        <Link href="/invoice-history" className="hover:underline">
          Invoice History
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        {/* Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-foreground"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Products */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Products</p>
            </div>
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>

          <div className="flex flex-col gap-3 rounded-md border border-border p-4">
            {rows.map((row, index) => (
              <div key={row.rowId} className="flex items-end gap-3">
                {/* Product picker */}
                <div className="relative flex flex-1 flex-col gap-1.5">
                  {index === 0 && (
                    <label className="text-xs font-semibold text-foreground">
                      Product
                    </label>
                  )}
                  <button
                    ref={row.triggerRef}
                    type="button"
                    onClick={() =>
                      setOpenPickerRowId((cur) =>
                        cur === row.rowId ? null : row.rowId,
                      )
                    }
                    className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3.5 py-2 text-left text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <span
                      className={
                        row.name ? "text-foreground" : "text-muted-foreground"
                      }
                    >
                      {row.name || "Select a product..."}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>

                  {openPickerRowId === row.rowId && (
                    <ProductPicker
                      products={availableProducts}
                      loading={loadingProducts}
                      onSelect={(p) => selectProduct(row.rowId, p)}
                      onClose={() => setOpenPickerRowId(null)}
                      anchorRef={row.triggerRef}
                    />
                  )}
                </div>

                <div className="flex w-24 flex-col gap-1.5">
                  {index === 0 && (
                    <label className="text-xs font-semibold text-foreground">
                      Quantity
                    </label>
                  )}
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) => updateQuantity(row.rowId, e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3.5 py-2 text-sm text-primary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* <div className="flex w-28 flex-col gap-1.5">
                  {index === 0 && (
                    <label className="text-xs font-semibold text-foreground">
                      Price
                    </label>
                  )}
                  <input
                    type="number"
                    defaultValue={0}
                    onChange={(e) => updatePrice(row.rowId, e.target.value)}
                    className="w-full rounded-md border border-border bg-muted/40 px-3.5 py-2 text-sm text-foreground outline-none"
                  />
                </div> */}

                <button
                  type="button"
                  onClick={() => removeRow(row.rowId)}
                  disabled={rows.length === 1}
                  className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold text-foreground">
            Total (Sell Price)
          </span>
          <input
            type="number"
            className="border p-2"
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
          />
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 hover:underline"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Creating..." : "Create Invoice"}
        </button>
      </form>
    </div>
  );
}

export default Invoice;

/* --- Product picker dropdown --- */

interface ProductPickerProps {
  products: Product[];
  loading: boolean;
  onSelect: (p: Product) => void;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

export function ProductPicker({
  products,
  loading,
  onSelect,
  onClose,
  anchorRef,
}: ProductPickerProps) {
  const [query, setQuery] = React.useState("");
  const [coords, setCoords] = React.useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchorRef]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const filtered = products.filter((p) => {
    const haystack = `${p.name} ${p.code} ${p.company} ${p.type}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  if (!mounted || !coords) return null;

  return createPortal(
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        width: Math.max(coords.width, 280),
        zIndex: 9999,
        backgroundColor: "#ffffff",
      }}
      className="flex flex-col overflow-hidden rounded-md border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
    >
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-zinc-400" />
        <input
          autoFocus
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </div>

      <div className="max-h-60 overflow-y-auto bg-white">
        {loading ? (
          <p className="px-3 py-4 text-sm text-zinc-400">Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="px-3 py-4 text-sm text-zinc-400">No products found.</p>
        ) : (
          filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              className="flex w-full items-center justify-between border-b border-zinc-100 bg-white px-3 py-2.5 text-left text-sm transition-colors last:border-b-0 hover:bg-zinc-50"
            >
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-medium text-zinc-900">
                  {p.name} <span className="text-zinc-400">({p.code})</span>
                </span>
                <span className="truncate text-xs text-zinc-500">
                  {p.company} · {p.type} · {p.size}
                </span>
              </span>
            </button>
          ))
        )}
      </div>
    </div>,
    document.body,
  );
}
