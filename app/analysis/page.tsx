// Paint --> sale , sale price , profit
// cement ---> salae , slep , profg
// Home --> expenses
// company --> given , credits

import { db } from "@/utils/db";
import {
  getDailyPaymentTotals,
  getHomePaymentTotals,
  getOtherProductReport,
  getProductTypeReport,
} from "@/utils/getCompanyReport";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) => {
  const { date } = await searchParams;

  const selectedDate = date ? new Date(`${date}T00:00:00`) : new Date();

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const startOfNextDay = new Date(startOfDay);
  startOfNextDay.setDate(startOfNextDay.getDate() + 1);

  const invoices = await db.invoice.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: startOfNextDay,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const paints = getProductTypeReport(invoices, "Paint");
  const cement = getProductTypeReport(invoices, "Cement");
  const other = getOtherProductReport(invoices);

  const companyPaymentHistory = await db.companyPaymentHistory.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: startOfNextDay,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const paymentTotals = getDailyPaymentTotals(companyPaymentHistory);

  const home = getHomePaymentTotals(companyPaymentHistory);

  const TOTAL_SALE =
    paints.totalSellPrice + cement.totalSellPrice + other.totalSellPrice;
  const TOTAL_PROFIT =
    paints.totalProfit + cement.totalProfit + other.totalProfit;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <form method="GET">
        <label htmlFor="date">Select Date</label>

        <input
          type="date"
          name="date"
          id="date"
          defaultValue={date ?? new Date().toISOString().split("T")[0]}
        />

        <button type="submit">Search</button>
      </form>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Daily Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Today's sales, payments, and expenses
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Paint Data */}
          <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100 blur-3xl transition group-hover:bg-blue-200" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    Sales
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Paint Data
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  🎨
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Quantity Sold
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {paints.totalQuantity}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Actual Price
                  </span>
                  <span className="text-lg font-semibold text-slate-700">
                    {paints.totalActualPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Sell Price
                  </span>
                  <span className="text-lg font-semibold text-blue-600">
                    {paints.totalSellPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3">
                  <span className="text-sm font-semibold text-emerald-700">
                    Total Profit
                  </span>
                  <span className="text-xl font-bold text-emerald-600">
                    {paints.totalProfit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cement Data */}
          <div className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-100 blur-3xl transition group-hover:bg-amber-200" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                    Sales
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Cement Data
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-xl">
                  🧱
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Quantity Sold
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {cement.totalQuantity}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Actual Price
                  </span>
                  <span className="text-lg font-semibold text-slate-700">
                    {cement.totalActualPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Sell Price
                  </span>
                  <span className="text-lg font-semibold text-amber-600">
                    {cement.totalSellPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3">
                  <span className="text-sm font-semibold text-emerald-700">
                    Total Profit
                  </span>
                  <span className="text-xl font-bold text-emerald-600">
                    {cement.totalProfit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Other Sold */}
          <div className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-100 blur-3xl transition group-hover:bg-violet-200" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
                    Sales
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Other Sold
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-xl">
                  📦
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Quantity Sold
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {other.totalQuantity}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Actual Price
                  </span>
                  <span className="text-lg font-semibold text-slate-700">
                    {other.totalActualPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Total Sell Price
                  </span>
                  <span className="text-lg font-semibold text-violet-600">
                    {other.totalSellPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3">
                  <span className="text-sm font-semibold text-emerald-700">
                    Total Profit
                  </span>
                  <span className="text-xl font-bold text-emerald-600">
                    {other.totalProfit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Total Payments */}
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100 blur-3xl transition group-hover:bg-emerald-200" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
                    Finance
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Company Total Payments
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                  💳
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      Total Added
                    </p>
                    <p className="mt-1 text-xs text-emerald-600">
                      Money added to company accounts
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-emerald-600">
                    {paymentTotals.totalAdded}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Total Removed
                    </p>
                    <p className="mt-1 text-xs text-red-600">
                      Money removed from company accounts
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-red-600">
                    {paymentTotals.totalRemoved}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Home Expenses */}
          <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-100 blur-3xl transition group-hover:bg-orange-200" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                    Expenses
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Home Expenses
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl">
                  🏠
                </div>
              </div>

              <div className="rounded-xl bg-orange-50 p-5">
                <p className="text-sm font-medium text-orange-700">Added</p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-orange-600">
                  {home.totalAdded}
                </p>

                <p className="mt-2 text-xs text-orange-600/70">
                  Total home-related expenses recorded today
                </p>
              </div>
            </div>
          </div>

          {/* TOTAL */}
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100 blur-3xl transition group-hover:bg-emerald-200" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
                    Total
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Total Payments
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                  💳
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      Total Sale
                    </p>
                    <p className="mt-1 text-xs text-emerald-600">
                      Total Sale price of all items sold
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-emerald-600">
                    {TOTAL_SALE}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Total Profit
                    </p>
                    <p className="mt-1 text-xs text-red-600">
                      Total Profit Obtained for all sold items
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-red-600">
                    {TOTAL_PROFIT}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
