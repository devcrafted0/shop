"use client";

import * as React from "react";
import { ChevronDown, FileText } from "lucide-react";

interface InvoiceProduct {
  id: number;
  name: string;
  code: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  actualPrice: number;
}

interface Invoice {
  id: number;
  description: string;
  products: InvoiceProduct[];
  sellPrice: number;
  createdAt: string;
  updatedAt: string;
}

const formatNumber = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export function InvoiceHistory() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/invoice");
        if (!res.ok) throw new Error("Failed to load invoices");
        const data: Invoice[] = await res.json();
        setInvoices(data);
      } catch {
        setError("Could not load invoice history.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Records
      </p>
      <h1 className="mt-1 text-3xl font-bold text-foreground">
        Invoice History
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View a complete history of created invoices and their products.
      </p>

      <div className="mt-6 overflow-hidden border border-border bg-card shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-[1.6fr_2fr_1fr_1fr] items-center gap-4 border-b border-border bg-muted/40 px-5 py-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Invoice
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Description
          </div>
          <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Sell Price
          </div>
          <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Date
          </div>
        </div>

        {loading && (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            Loading invoices...
          </div>
        )}

        {error && (
          <div className="px-5 py-10 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && invoices.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            No invoices yet.
          </div>
        )}

        {!loading &&
          !error &&
          invoices.map((invoice) => {
            const isOpen = expandedId === invoice.id;
            const itemCount = invoice.products.reduce(
              (sum, p) => sum + p.amount,
              0,
            );

            const totalCost = invoice.products.reduce((total, product) => {
              return total + product.amount * product.actualPrice;
            }, 0);
            const profit = invoice.sellPrice - totalCost;

            return (
              <div
                key={invoice.id}
                className="border-b border-border last:border-b-0"
              >
                {/* Row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : invoice.id)}
                  className="grid w-full grid-cols-[1.6fr_2fr_1fr_1fr] items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
                >
                  {/* Invoice */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        Invoice #{invoice.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {itemCount} item{itemCount !== 1 ? "s" : ""} ·{" "}
                        {invoice.products.length} product
                        {invoice.products.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="min-w-0 overflow-hidden">
                    <p className="truncate text-sm font-medium text-foreground">
                      {invoice.description || "—"}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                      {formatNumber(invoice.sellPrice)}
                    </span>
                  </div>

                  {/* Date + chevron */}
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {new Date(invoice.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {new Date(invoice.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded product breakdown */}
                {isOpen && (
                  <div className="border-t border-border bg-muted/20 px-5 py-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Products
                    </p>
                    <div className="overflow-hidden rounded-md border border-border bg-background">
                      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 border-b border-border bg-muted/40 px-4 py-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Name
                        </span>
                        <span className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Qty
                        </span>
                        <span className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Actual Price
                        </span>
                      </div>
                      {invoice.products.map((p, i) => (
                        <div
                          key={`${invoice.id}-${p.id}-${i}`}
                          className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 border-b border-border px-4 py-2.5 last:border-b-0"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">
                              {p.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {p.code}
                            </p>
                          </div>
                          <span className="text-right font-mono text-sm text-foreground">
                            {p.amount}
                          </span>
                          <span className="text-right font-mono text-sm text-muted-foreground">
                            {formatNumber(p.actualPrice * p.amount)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-end items-center gap-4 border-b border-border px-4 py-2.5 last:border-b-0 bg-green-500/40">
                        <span className="text-sm font-bold uppercase text-muted-foreground">
                          Total Profit :
                        </span>
                        <span className="text-sm font-bold uppercase text-muted-foreground">
                          {profit}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}
