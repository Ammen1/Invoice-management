"use client";

import InvoiceForm from "@/components/forms/InvoiceForm";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store'; 

const InvoiceForms = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
//   const { token } = router.query;

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push('/signin');
    }
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated) return null;

  return (
    <div>
      <InvoiceForm />
    </div>
  );
};

export default InvoiceForms;


