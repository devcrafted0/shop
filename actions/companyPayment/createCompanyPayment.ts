"use server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createCompanyPayment(formData: FormData) {
  const name = formData.get("name") as string;
  const day = formData.get("day") as string;
  const credits = Number(formData.get("credits"));

  if (isNaN(credits)) {
    return;
  }

  await db.companyPayment.create({
    data: {
      day,
      name,
      credits,
    },
  });
  revalidatePath("/manage");
}
