"use client";


import InvoiceForm from "./forms/InvoiceForm";

const CreateInvoicePage = () => {
  const userId = "user-id-here"; // Get the user ID from your context or state

  return (
    <div>
      <h1>Create New Invoice</h1>
      <InvoiceForm userId={userId} type="create" />
    </div>
  );
};

export default CreateInvoicePage;
