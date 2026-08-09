import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const product = await db.companyPayment.findMany();

  return NextResponse.json(product);
}
