"use server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

const addCustomProductType = async (formData: FormData) => {
  const productType = formData.get("productType") as string;

  await db.productType.create({
    data: {
      name: productType,
    },
  });
  revalidatePath("/manage");
};

export default addCustomProductType;
