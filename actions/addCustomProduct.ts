"use server";
import { db } from "@/utils/db";

const addCustomProduct = async (formData: FormData) => {
  const customProduct = formData.get("customProduct") as string;

  await db.customProduct.create({
    data: {
      name: customProduct,
    },
  });
};

export default addCustomProduct;
