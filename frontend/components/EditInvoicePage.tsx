"use client";

import InvoiceForm from './forms/InvoiceForm';
import { Invoice } from './forms/types';
interface EditInvoicePageProps {
  invoice?: Invoice;
  userId?: string;
}

const EditInvoicePage = ({ invoice, userId }: EditInvoicePageProps) => {
  return (
    <div>
      <h1>Edit Invoice</h1>
      <InvoiceForm invoice={invoice} userId={userId} type="edit" />
    </div>
  );
};

export default EditInvoicePage;
