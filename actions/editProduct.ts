"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function editProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const amount = Number(formData.get("amount"));

  if (!Number.isInteger(id)) {
    throw new Error("Invalid product ID");
  }

  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error("Invalid amount");
  }

  await db.product.update({
    where: {
      id,
    },
    data: {
      amount,
    },
  });

  revalidatePath("/manage");
}
