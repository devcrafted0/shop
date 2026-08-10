"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { type ProductSize } from "@/generated/prisma/enums";

export async function megaPriceUpdater(formData: FormData) {
  const product = formData.get("product") as string;
  const company = formData.get("company") as string;
  const type = formData.get("type") as string;
  const size = formData.get("size") as ProductSize;
  const newActualPrice = Number(formData.get("new-actual-price"));

  const result = await db.product.updateMany({
    where: {
      product: product,
      company: company,
      type: type,
      size: size,
    },
    data: {
      actualPrice: newActualPrice,
    },
  });

  revalidatePath("/manage");
}
