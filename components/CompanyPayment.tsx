"use client";

import { useEffect, useState } from "react";
import { type CompanyPayment } from "@/generated/prisma/client";
import { editCompanyPayment } from "@/actions/companyPayment/editCompanyPayment";

const CompanyPayment = () => {
  const [companyPayment, setCompanyPayment] = useState<CompanyPayment[]>([]);

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

  return (
    <div className="border h-full">
      <h1 className="font-bold text-center my-2 text-lg">Company Payment</h1>
      {companyPayment.map((c) => (
        <form key={c.id} action={handleFormSubmit} className="flex gap-3 p-2">
          <p className="font-semibold">{c.name}</p>
          <input type="number" name="credits" id="credits" className="border" />
          <input type="hidden" name="id" value={c.id} />
        </form>
      ))}
      <div>
        {companyPayment.map((c) => (
          <li>
            {c.name} {c.credits}
          </li>
        ))}
      </div>
    </div>
  );
};

export default CompanyPayment;
