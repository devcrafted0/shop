import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET() {
  const products = await db.product.findMany({
    orderBy: { name: "asc" },
  });

  console.log(
    { products },
    "---------------------------------------------------------------------------------------------",
  );

  return NextResponse.json(products);
}
