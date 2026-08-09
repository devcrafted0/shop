// Paint --> sale , sale price , profit
// cement ---> salae , slep , profg
// Home --> expenses
// company --> given , credits

import { db } from "@/utils/db";

const Page = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const invoices = await db.invoice.findMany({
    where: {
      createdAt: {
        gte: startOfToday,
        lt: startOfTomorrow,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <div></div>;
};

export default Page;
