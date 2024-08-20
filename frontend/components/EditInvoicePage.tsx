"use client";

import InvoiceForm from './forms/InvoiceForm';

const EditInvoicePage = ({ invoice, userId }) => {
  


  return (
    <div>
      <h1>Edit Invoice</h1>
      <InvoiceForm invoice={invoice} userId={userId} type="edit" />
    </div>
  );
};

export default EditInvoicePage;
