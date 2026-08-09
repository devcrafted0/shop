-- CreateTable
CREATE TABLE "CompanyPaymentHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "credits" INTEGER NOT NULL,
    "beforeCredits" INTEGER NOT NULL,
    "afterCredits" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
