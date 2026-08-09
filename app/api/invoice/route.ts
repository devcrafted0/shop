import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { description, products, sellPrice } = body;

    if (!description || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const invoice = await db.$transaction(async (tx) => {
      // 1. Check and decrease inventory
      for (const product of products) {
        const inventoryProduct = await tx.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!inventoryProduct) {
          throw new Error(`Product ${product.id} not found`);
        }

        if (inventoryProduct.amount < product.amount) {
          throw new Error(`Not enough stock for ${inventoryProduct.name}`);
        }

        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            amount: {
              decrement: product.amount,
            },
          },
        });
      }

      // 2. Create invoice
      return tx.invoice.create({
        data: {
          description,
          products,
          sellPrice,
        },
      });
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const invoices = await db.invoice.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(invoices);
}
