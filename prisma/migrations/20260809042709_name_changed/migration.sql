/*
  Warnings:

  - You are about to drop the column `companyPayment` on the `CompanyPaymentHistory` table. All the data in the column will be lost.
  - Added the required column `companyPaymentName` to the `CompanyPaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyPaymentHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyPaymentName" TEXT NOT NULL,
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
