import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query")?.trim() ?? "";

  if (!query) {
    return NextResponse.json([]);
  }

  const paints = await db.paint.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          company: {
            contains: query,
          },
        },
        {
          color: {
            contains: query,
          },
        },
        {
          colorCode: {
            contains: query,
          },
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(paints);
}
