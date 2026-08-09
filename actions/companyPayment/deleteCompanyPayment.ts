"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function deleteCompanyPayment(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    throw new Error("Invalid paint ID");
  }

  await db.companyPayment.delete({
    where: {
      id,
    },
  });

  revalidatePath("/manage");
}
