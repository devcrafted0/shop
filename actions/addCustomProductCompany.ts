"use server";
import { db } from "@/utils/db";

const addCustomProductCompany = async (formData: FormData) => {
  const customProduct = formData.get("customProductCompany") as string;

  await db.productCompany.create({
    data: {
      name: customProduct,
    },
  });
};

export default addCustomProductCompany;
