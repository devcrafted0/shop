"use client";

import { useEffect, useState } from "react";
import { type CompanyPayment } from "@/generated/prisma/client";
import { editCompanyPayment } from "@/actions/companyPayment/editCompanyPayment";
import Link from "next/link";

const CompanyPayment = () => {
  const [companyPayment, setCompanyPayment] = useState<CompanyPayment[]>([]);
  const [filteredCompanyPayment, setFilteredCompanyPayment] = useState<
    CompanyPayment[]
  >([]);
  const [orderedCompanyPayment, setOrderedCompanyPayment] =
    useState<CompanyPayment[]>();

  useEffect(() => {
    const fetchPaints = async () => {
      const res = await fetch(`/api/companyPayment`);

      const data = await res.json();

      setCompanyPayment(data);
    };

    fetchPaints();
  }, []);

  const handleFormSubmit = (formData: FormData) => {
    editCompanyPayment(formData);
    window.location.reload();
  };

  function formatNumber(value: number): string {
    return value.toLocaleString("en-US");
  }

  const dayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  useEffect(() => {
    setFilteredCompanyPayment(companyPayment.filter((f) => f.day === dayName));
  }, [companyPayment]);

  useEffect(() => {
    setOrderedCompanyPayment(
      companyPayment.sort((a, b) => b.credits - a.credits),
    );
  }, [companyPayment]);

  return (
    <div className="border h-full">
      <h1 className="font-bold text-center my-2 text-lg">Company Payment</h1>
      <div className="flex justify-between px-3">
        <p className="font-semibold">Day : {dayName}</p>
        <Link href="/company-payment-history" className="hover:underline">
          History
        </Link>
      </div>
      {filteredCompanyPayment.map((c) => (
        <form key={c.id} action={handleFormSubmit} className="flex gap-3 p-2">
          <p className="font-semibold">{c.name}</p>
          <input type="number" name="credits" id="credits" className="border" />
          <input type="hidden" name="id" value={c.id} />
        </form>
      ))}
      <div className="border-t border-b pb-3">
        {orderedCompanyPayment &&
          orderedCompanyPayment.map((c) => (
            <section key={c.id} className="pt-3 px-3">
              {" "}
              <div className="grid grid-cols-2 overflow-hidden border border-border bg-card shadow-sm">
                {" "}
                <div className="border-r border-border bg-muted/40 px-4 py-3 text-sm font-medium text-muted-foreground">
                  {" "}
                  {c.name}{" "}
                </div>{" "}
                <div className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                  {" "}
                  {formatNumber(c.credits)}{" "}
                </div>{" "}
              </div>{" "}
            </section>
          ))}
      </div>
    </div>
  );
};

export default CompanyPayment;
