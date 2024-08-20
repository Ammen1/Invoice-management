"use client";

import EditInvoicePage from '@/components/EditInvoicePage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const EditInvoice = () => {
  const authState = useSelector((state: RootState) => state.auth);

  // Assuming userId is from authState
  const userId = authState.userId;

  if (!userId) {
    // Handle case where userId is not available
    return <div>Loading...</div>; // Or redirect to another page
  }

  const invoice = null; // Replace with actual invoice data if available

  return <EditInvoicePage userId={userId} invoice={invoice} />;
};

export default EditInvoice;
