"use server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

const addCustomProduct = async (formData: FormData) => {
  const customProduct = formData.get("customProduct") as string;

  await db.customProduct.create({
    data: {
      name: customProduct,
    },
  });
  revalidatePath("/manage");
};

export default addCustomProduct;
