import { CreditTransactionType } from "@/generated/prisma/enums";
import { CompanyPaymentHistory } from "@/generated/prisma/client";

type InvoiceProduct = {
  productId: number;
  name: string;
  code: string;
  company: string;
  type: string;
  unitPrice: number;
  totalPrice: number;
  actualPrice: number;
  product: string;
  amount: number;
};

type Invoice = {
  products: unknown;
  sellPrice: number;
  createdAt: Date;
};

export function getProductTypeReport(invoices: Invoice[], type: string) {
  const products: InvoiceProduct[] = [];

  let totalQuantity = 0;
  let totalSellPrice = 0;
  let totalActualPrice = 0;
  let totalProfit = 0;
  let invoiceCount = 0;

  for (const invoice of invoices) {
    const invoiceProducts = invoice.products as InvoiceProduct[];

    const matchingProducts = invoiceProducts.filter(
      (product) => product.product?.toLowerCase() === type.toLowerCase(),
    );

    if (matchingProducts.length === 0) continue;

    invoiceCount++;

    for (const product of matchingProducts) {
      const amount = Number(product.amount) || 0;
      const actualPrice = Number(product.actualPrice) || 0;
      const totalPrice = Number(product.totalPrice) || 0;

      const actualTotal = actualPrice * amount;
      const profit = totalPrice - actualTotal;

      products.push(product);

      totalQuantity += amount;
      totalSellPrice += totalPrice;
      totalActualPrice += actualTotal;
      totalProfit += profit;
    }
  }

  return {
    type,
    products,
    totalQuantity,
    totalSellPrice,
    totalActualPrice,
    totalProfit,
    invoiceCount,
    productCount: products.length,
  };
}

export function getOtherProductReport(invoices: Invoice[]) {
  const products: InvoiceProduct[] = [];

  let totalQuantity = 0;
  let totalSellPrice = 0;
  let totalActualPrice = 0;
  let totalProfit = 0;
  let invoiceCount = 0;

  for (const invoice of invoices) {
    const invoiceProducts = invoice.products as InvoiceProduct[];

    const matchingProducts = invoiceProducts.filter(
      (product) =>
        product.product?.toLowerCase() !== "paint" &&
        product.product?.toLowerCase() !== "cement",
    );

    if (matchingProducts.length === 0) continue;

    invoiceCount++;

    for (const product of matchingProducts) {
      const amount = Number(product.amount) || 0;
      const actualPrice = Number(product.actualPrice) || 0;
      const totalPrice = Number(product.totalPrice) || 0;

      const actualTotal = actualPrice * amount;
      const profit = totalPrice - actualTotal;

      products.push(product);

      totalQuantity += amount;
      totalSellPrice += totalPrice;
      totalActualPrice += actualTotal;
      totalProfit += profit;
    }
  }

  return {
    products,
    totalQuantity,
    totalSellPrice,
    totalActualPrice,
    totalProfit,
    invoiceCount,
    productCount: products.length,
  };
}

export function getDailyPaymentTotals(payments: CompanyPaymentHistory[]) {
  let totalAdded = 0;
  let totalRemoved = 0;

  for (const payment of payments) {
    if (payment.companyPaymentName === "Home") {
      continue;
    }

    const credits = Number(payment.credits) || 0;

    if (payment.transactionType === "ADD") {
      totalAdded += credits;
    }

    if (payment.transactionType === "REMOVE") {
      totalRemoved += credits;
    }
  }

  return {
    totalAdded,
    totalRemoved,
    netChange: totalAdded - totalRemoved,
    transactionCount: payments.length,
  };
}

export function getHomePaymentTotals(payments: CompanyPaymentHistory[]) {
  let totalAdded = 0;
  let totalRemoved = 0;

  for (const payment of payments) {
    if (payment.companyPaymentName !== "Home") {
      continue;
    }

    const credits = Number(payment.credits) || 0;

    if (payment.transactionType === "ADD") {
      totalAdded += credits;
    }

    if (payment.transactionType === "REMOVE") {
      totalRemoved += credits;
    }
  }

  return {
    totalAdded,
    totalRemoved,
    netChange: totalAdded - totalRemoved,
    transactionCount: payments.filter(
      (payment) => payment.companyPaymentName === "Home",
    ).length,
  };
}
