"use client";

import InvoiceForm from './forms/InvoiceForm';
import { useEffect, useState } from 'react';

const EditInvoicePage = () => {
  const [invoice, setInvoice] = useState(null);
  


  return (
    <div>
      <h1>Edit Invoice</h1>
      <InvoiceForm invoice={invoice} type="edit" />
    </div>
  );
};

export default EditInvoicePage;
