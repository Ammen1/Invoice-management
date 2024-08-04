"use client";

import InvoiceForm from "@/components/forms/InvoiceForm";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const InvoiceForms = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push('/signin');
    }
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated) return null;

  const userId = authState.access_token; // Use access_token as userId
  const type = 'create'; 
  const invoice = null; // Replace with actual invoice data if needed

  return (
    <div>
      <InvoiceForm
        userId={userId}
        invoice={invoice}
        type={type}
        // Optionally, provide setOpen if needed
      />
    </div>
  );
};

export default InvoiceForms;
