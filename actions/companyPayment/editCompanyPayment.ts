"use server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function editCompanyPayment(formData: FormData) {
  const id = Number(formData.get("id"));
  const creditsToRemove = Number(formData.get("credits"));

  if (isNaN(creditsToRemove)) {
    return;
  }

  const companyPayment = await db.companyPayment.findUnique({ where: { id } });

  if (companyPayment?.credits! < 0) {
    return;
  }

  const credits = companyPayment?.credits! - creditsToRemove;

  if (isNaN(credits) || credits < 0) {
    return;
  }

  await db.companyPayment.update({
    where: {
      id,
    },
    data: {
      credits,
    },
  });

  revalidatePath("/");
}
