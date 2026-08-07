/*
  Warnings:

  - You are about to drop the column `description` on the `Paint` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Paint` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,
    "quarter" INTEGER NOT NULL DEFAULT 0,
    "gallon" INTEGER NOT NULL DEFAULT 0,
    "small" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Paint" ("color", "colorCode", "company", "createdAt", "gallon", "id", "name", "quarter", "small", "updatedAt") SELECT "color", "colorCode", "company", "createdAt", "gallon", "id", "name", "quarter", "small", "updatedAt" FROM "Paint";
DROP TABLE "Paint";
ALTER TABLE "new_Paint" RENAME TO "Paint";
CREATE UNIQUE INDEX "Paint_colorCode_key" ON "Paint"("colorCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
