"use server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function addCommpanyPaymentHistory(formData: FormData) {
  const creditsToAdd = Number(formData.get("credits"));
  const description = formData.get("description") as string;
  const id = Number(formData.get("id"));

  const companyPayment = await db.companyPayment.findUnique({ where: { id } });

  if (!companyPayment) {
    return;
  }

  const afterCredits = companyPayment.credits + creditsToAdd;

  await db.companyPaymentHistory.create({
    data: {
      companyPaymentName: companyPayment.name,
      credits: creditsToAdd,
      afterCredits: afterCredits,
      beforeCredits: companyPayment.credits,
      description,
      transactionType: "ADD",
    },
  });

  await db.companyPayment.update({
    where: { id },
    data: { credits: afterCredits },
  });
  revalidatePath("/company-payment-history");
}
