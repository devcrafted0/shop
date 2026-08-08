import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query")?.trim() ?? "";

  if (!query) {
    return NextResponse.json([]);
  }

  console.log(query);

  const product = await db.product.findMany({
    where: {
      OR: [
        {
          type: {
            contains: query,
          },
        },
        {
          company: {
            contains: query,
          },
        },
        {
          name: {
            contains: query,
          },
        },
        {
          code: {
            contains: query,
          },
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(product);
}
