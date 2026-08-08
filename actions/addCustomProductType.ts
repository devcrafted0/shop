"use server";
import { db } from "@/utils/db";

const addCustomProductType = async (formData: FormData) => {
  const productType = formData.get("productType") as string;

  await db.productType.create({
    data: {
      name: productType,
    },
  });
};

export default addCustomProductType;
