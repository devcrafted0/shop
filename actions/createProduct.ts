"use server";
import { db } from "@/utils/db";

export async function createProduct(formData: FormData) {
  await db.product.create({
    data: {
      product: formData.get("product") as string,
      type: formData.get("type") as string,
      company: formData.get("company") as string,
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      amount: Number(formData.get("amount")),
      size: formData.get("size") as
        | "TINLET"
        | "QUARTER"
        | "GALLON"
        | "DRUM"
        | "FULL",
    },
  });
}
