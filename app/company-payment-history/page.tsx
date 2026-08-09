import { addCommpanyPaymentHistory } from "@/actions/companyPaymentHistory/addCompanyPaymentHistory";
import { db } from "@/utils/db";
import { formatNumber } from "@/utils/formatNumber";
import Link from "next/link";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; query?: string }>;
}) => {
  const { from, to, query } = await searchParams;

  const companyPaymenyHistory = await db.companyPaymentHistory.findMany({
    where:
      from || to
        ? {
            createdAt: {
              ...(from && { gte: new Date(from) }),
              ...(to && { lte: new Date(`${to}T23:59:59.999`) }),
            },
          }
        : undefined,
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const filtered = companyPaymenyHistory.filter(
    (item) => !query || item.companyPaymentName === query,
  );

  const companyPayment = await db.companyPayment.findMany();

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div className="border p-2 w-full">
        <div className="grid grid-cols-3">
          <span className="border p-1 ">Company Name</span>
          <span className="border p-1">Orders Take</span>
          <span className="border p-1">Money Given</span>
        </div>
        {companyPayment.map((c) => {
          let ordersTake = 0;
          let moneyGiven = 0;
          companyPaymenyHistory.map((company) => {
            if (c.name === company.companyPaymentName) {
              if (company.transactionType === "ADD") {
                ordersTake += company.credits;
              } else if (company.transactionType === "REMOVE") {
                moneyGiven += company.credits;
              }
            } else {
              return;
            }
          });
          return (
            <li className="grid grid-cols-3" key={c.id}>
              <span className="border p-1">{c.name}</span>
              <span className="border p-1">{formatNumber(ordersTake)}</span>
              <span className="border p-1">{formatNumber(moneyGiven)}</span>
            </li>
          );
        })}
      </div>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Records
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Payment History
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            View a complete history of company credit changes and transactions.
          </p>

          <form
            action={addCommpanyPaymentHistory}
            className="my-6 flex flex-col gap-3"
          >
            <h2 className="text-lg font-bold text-black">Add Credits</h2>

            <div className="flex flex-col flex-wrap justify-center gap-3">
              <div className="flex gap-5 items-center ">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-900"
                >
                  Name :
                </label>

                <select
                  name="id"
                  id="id"
                  className="rounded-none border border-black bg-white px-3 py-1.5 text-sm text-black outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
                >
                  {companyPayment.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <input
                  name="credits"
                  id="credits"
                  type="number"
                  placeholder="0"
                  className="w-32 rounded-none border border-black bg-white px-3 py-1.5 text-sm text-black outline-none transition-colors placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-zinc-900"
                >
                  Description :
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="w-full rounded-none border border-black bg-white px-3 py-1.5 text-sm text-black outline-none transition-colors placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black"
                ></textarea>
              </div>
            </div>
          </form>

          <form>
            {" "}
            <label htmlFor="query">Search :</label>{" "}
            <input
              type="text"
              name="query"
              id="query"
              defaultValue={query}
            />{" "}
          </form>

          <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden border border-border bg-card shadow-sm">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_1.3fr] items-center gap-4 border-b border-border bg-muted/40 px-5 py-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Company
                </div>

                <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Before
                </div>

                <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Credits
                </div>

                <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  After
                </div>

                <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </div>

                <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </div>
              </div>

              {filtered.map((payment) => (
                <div
                  key={payment.id}
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_1.3fr] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 transition-colors hover:bg-muted/40"
                >
                  {/* Company */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {payment.companyPaymentName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {payment.companyPaymentName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Payment transaction
                      </p>
                    </div>
                  </div>

                  {/* Before Credits */}
                  <div className="text-right">
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      {formatNumber(payment.beforeCredits)}
                    </span>
                  </div>

                  {/* Credits Added */}
                  <div className="text-right">
                    <span
                      className={`inline-flex rounded-md bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold tabular-nums text-primary ${payment.transactionType === "ADD" ? "text-green-700" : "text-red-700"}`}
                    >
                      {payment.transactionType === "ADD" ? "+" : "-"}
                      {formatNumber(payment.credits)}
                    </span>
                  </div>

                  {/* After Credits */}
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                      {formatNumber(payment.afterCredits)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="min-w-0 overflow-hidden text-right">
                    <p className="cursor-default truncate text-sm font-medium text-foreground">
                      {payment.description}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <form method="GET">
          {" "}
          <div>
            {" "}
            <label htmlFor="from">From:</label>{" "}
            <input type="date" name="from" id="from" defaultValue={from} />{" "}
          </div>{" "}
          <div>
            {" "}
            <label htmlFor="to">To:</label>{" "}
            <input type="date" name="to" id="to" defaultValue={to} />{" "}
          </div>{" "}
          <button type="submit"> Search </button>{" "}
        </form>

        <Link href="/company-payment-history">Reset</Link>
      </main>
    </div>
  );
};

export default Page;
