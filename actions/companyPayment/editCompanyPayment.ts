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

  if (!companyPayment) {
    return;
  }

  if (companyPayment?.credits! < 0) {
    return;
  }

  const afterCredits = companyPayment?.credits - creditsToRemove;

  if (isNaN(afterCredits) || afterCredits < 0) {
    return;
  }

  await db.companyPaymentHistory.create({
    data: {
      credits: creditsToRemove,
      beforeCredits: companyPayment?.credits,
      afterCredits,
      companyPaymentName: companyPayment?.name,
      transactionType: "REMOVE",
    },
  });

  await db.companyPayment.update({
    where: {
      id,
    },
    data: {
      credits: afterCredits,
    },
  });

  revalidatePath("/");
}
