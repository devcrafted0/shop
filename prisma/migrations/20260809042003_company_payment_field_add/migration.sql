/*
  Warnings:

  - Added the required column `companyPayment` to the `CompanyPaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyPaymentHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyPayment" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "beforeCredits" INTEGER NOT NULL,
    "afterCredits" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CompanyPaymentHistory" ("afterCredits", "beforeCredits", "createdAt", "credits", "id", "updatedAt") SELECT "afterCredits", "beforeCredits", "createdAt", "credits", "id", "updatedAt" FROM "CompanyPaymentHistory";
DROP TABLE "CompanyPaymentHistory";
ALTER TABLE "new_CompanyPaymentHistory" RENAME TO "CompanyPaymentHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
