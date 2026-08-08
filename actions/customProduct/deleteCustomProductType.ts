"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function deleteCustomProductType(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    throw new Error("Invalid paint ID");
  }

  await db.productType.delete({
    where: {
      id,
    },
  });

  revalidatePath("/manage");
}
