"use client";

// import { useRouter } from 'next/router';
import InvoiceForm from './forms/InvoiceForm';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { RootState } from '../store'; // Adjust the path according to your setup

const EditInvoicePage = () => {
  // const router = useRouter();
  // const { id } = router.query; // Get the invoice ID from the URL
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  return (
    <div>
      <h1>Edit Invoice</h1>
      <InvoiceForm invoice={invoice} type="edit" />
    </div>
  );
};

export default EditInvoicePage;
