"use server";
import { db } from "@/utils/db";

export async function createPaint(formData: FormData) {
  await db.paint.create({
    data: {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      color: formData.get("color") as string,
      colorCode: formData.get("colorCode") as string,
      quarter: Number(formData.get("quarter")),
      gallon: Number(formData.get("gallon")),
      small: Number(formData.get("small")),
    },
  });
}
