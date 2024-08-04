/*
  Warnings:

  - You are about to drop the column `clientName` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `clientAddress` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCity` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCompanyName` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCountry` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueDate` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuerAddress` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuerCity` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuerCompanyName` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuerContactName` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuerCountry` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'OVERDUE');

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "clientName",
DROP COLUMN "items",
DROP COLUMN "totalAmount",
ADD COLUMN     "clientAddress" TEXT NOT NULL,
ADD COLUMN     "clientCity" TEXT NOT NULL,
ADD COLUMN     "clientCompanyName" TEXT NOT NULL,
ADD COLUMN     "clientCountry" TEXT NOT NULL,
ADD COLUMN     "companyLogoUrl" TEXT,
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "issuerAddress" TEXT NOT NULL,
ADD COLUMN     "issuerCity" TEXT NOT NULL,
ADD COLUMN     "issuerCompanyName" TEXT NOT NULL,
ADD COLUMN     "issuerContactName" TEXT NOT NULL,
ADD COLUMN     "issuerCountry" TEXT NOT NULL,
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "invoiceNumber" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "taxAmount" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
