"use client";

import InvoiceTable from "@/components/InvoiceTable";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/store";

const InvoicesPage = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push('/signin');
    }
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated) return null;
  return (
    <div>
      <InvoiceTable />
    </div>
  );
};

export default InvoicesPage;
