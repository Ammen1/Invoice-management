"use client";

import InvoiceForm from "@/components/forms/InvoiceForm";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const InvoiceForms = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push('/signin');
    }
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated) return null;

  const userId = authState.userId; // or derive this from authState
  const type = 'create'; // or 'edit' based on context

  const invoice = null; // Fetch or set the invoice details if editing

  return (
    <div>
      <InvoiceForm
        userId={userId}
        invoice={invoice}
        type={type}
      />
    </div>
  );
};

export default InvoiceForms;
