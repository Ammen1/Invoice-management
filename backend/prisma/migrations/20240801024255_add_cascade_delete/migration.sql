-- DropForeignKey
ALTER TABLE "invoice_items" DROP CONSTRAINT "invoice_items_invoiceId_fkey";

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
