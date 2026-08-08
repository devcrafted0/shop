"use server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

const addCustomProductCompany = async (formData: FormData) => {
  const customProduct = formData.get("customProductCompany") as string;

  await db.productCompany.create({
    data: {
      name: customProduct,
    },
  });
  revalidatePath("/manage");
};

export default addCustomProductCompany;
