/*
  Warnings:

  - Added the required column `transactionType` to the `CompanyPaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyPaymentHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyPaymentName" TEXT NOT NULL,
    "description" TEXT,
    "credits" INTEGER NOT NULL,
    "beforeCredits" INTEGER NOT NULL,
    "afterCredits" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CompanyPaymentHistory" ("afterCredits", "beforeCredits", "companyPaymentName", "createdAt", "credits", "description", "id", "updatedAt") SELECT "afterCredits", "beforeCredits", "companyPaymentName", "createdAt", "credits", "description", "id", "updatedAt" FROM "CompanyPaymentHistory";
DROP TABLE "CompanyPaymentHistory";
ALTER TABLE "new_CompanyPaymentHistory" RENAME TO "CompanyPaymentHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
