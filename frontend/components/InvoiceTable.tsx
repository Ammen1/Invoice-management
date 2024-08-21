"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import Paginate from './ui/Paginate';
import { Button } from './ui/button';
import ExcelJS from 'exceljs';
import EditInvoiceForm from './EditInvoiceForm'; 

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Invoice | null>(null);

  interface LineItem {
    description: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  }
  
  interface Invoice {
    id: string;
    invoiceNumber: string;
    issuerCompanyName: string;
    clientCompanyName: string;
    issueDate: string;
    dueDate: string;
    status: string;
    lineItems: LineItem[];
    companyLogoUrl?: string;
  }
  

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) throw new Error('No access token found');

        const response = await axios.get('http://localhost:4000/invoices', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setInvoices(response.data);
        setLoading(false);
      } catch (error) {
        setError("error occor");
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleUpdateInvoice = (invoice: Invoice) => {
    setEditFormData(invoice);
    setIsEditFormOpen(true);
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const openPopup = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedInvoice(null);
  };

  const handleExportPDF = async (invoice: Invoice) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    const fontSize = 12;
    page.drawText(`Invoice Number: ${invoice.invoiceNumber}`, { x: 50, y: height - 50, size: fontSize });
    page.drawText(`Company Name: ${invoice.issuerCompanyName}`, { x: 50, y: height - 70, size: fontSize });
    page.drawText(`Issue Date: ${new Date(invoice.issueDate).toDateString()}`, { x: 50, y: height - 90, size: fontSize });
    page.drawText(`Due Date: ${new Date(invoice.dueDate).toDateString()}`, { x: 50, y: height - 110, size: fontSize });
    page.drawText(`Status: ${invoice.status}`, { x: 50, y: height - 130, size: fontSize });

    let y = height - 160;
    for (const item of invoice.lineItems) {
      page.drawText(`Description: ${item.description}`, { x: 50, y, size: fontSize });
      page.drawText(`Quantity: ${item.quantity}`, { x: 50, y: y - 20, size: fontSize });
      page.drawText(`Unit Price: ${item.unitPrice}`, { x: 50, y: y - 40, size: fontSize });
      page.drawText(`Total Amount: ${item.totalAmount}`, { x: 50, y: y - 60, size: fontSize });
      y -= 80;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.invoiceNumber}.pdf`;
    link.click();
  };

  const handleExportExcel = async (invoice: Invoice) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Invoice');

    worksheet.columns = [
      { header: 'Description', key: 'description' },
      { header: 'Quantity', key: 'quantity' },
      { header: 'Unit Price', key: 'unitPrice' },
      { header: 'Total Amount', key: 'totalAmount' },
    ];

    invoice.lineItems.forEach((item: LineItem) => {
      worksheet.addRow({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalAmount: item.totalAmount
      });
    });

    worksheet.getCell('A1').value = `Invoice Number: ${invoice.invoiceNumber}`;
    worksheet.getCell('A2').value = `Company Name: ${invoice.issuerCompanyName}`;
    worksheet.getCell('A3').value = `Issue Date: ${new Date(invoice.issueDate).toDateString()}`;
    worksheet.getCell('A4').value = `Due Date: ${new Date(invoice.dueDate).toDateString()}`;
    worksheet.getCell('A5').value = `Status: ${invoice.status}`;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.invoiceNumber}.xlsx`;
    link.click();
  };

  const handleStatusChange = async (invoiceId: string, status: string) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) throw new Error('No access token found');

      await axios.patch(`http://localhost:4000/invoices/${invoiceId}`, { status }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setInvoices(prev => prev.map(invoice => 
        invoice.id === invoiceId ? { ...invoice, status } : invoice
      ));
    } catch (error) {
      setError("error");
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) throw new Error('No access token found');

      await axios.delete(`cinvoices/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setInvoices(prev => prev.filter(invoice => invoice.id !== invoiceId));
    } catch (error) {
      setError("error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const offset = currentPage * itemsPerPage;
  const paginatedInvoices = invoices.slice(offset, offset + itemsPerPage);

  return (
    <div className="container mx-auto p-4 mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Logo</TableHead>
            <TableHead>Issuer Company Name</TableHead>
            <TableHead>Client Company Name</TableHead>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <img src={invoice.companyLogoUrl || '/default-logo.png'} alt="Company Logo" width={50} height={50} />
              </TableCell>
              <TableCell>{invoice.issuerCompanyName}</TableCell>
              <TableCell>{invoice.clientCompanyName}</TableCell>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{new Date(invoice.issueDate).toDateString()}</TableCell>
              <TableCell>
                <select 
                  value={invoice.status}
                  onChange={(e) => handleStatusChange(invoice.id, e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
              </TableCell>
              <TableCell>
                <select onChange={(e) => {
                  const action = e.target.value;
                  if (action === 'export_pdf') handleExportPDF(invoice);
                  else if (action === 'export_excel') handleExportExcel(invoice);
                  else if (action === 'delete') handleDeleteInvoice(invoice.id);
                }}>
                  <option className='' value="">Export</option>
                  <option value="export_pdf">Export as PDF</option>
                  <option value="export_excel">Export as Excel</option>
                  <option value="delete">Delete</option>
                </select>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleUpdateInvoice(invoice)}>Edit</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => openPopup(invoice)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isPopupOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white border text-black border-gray-300 p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
            <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</p>
            <p><strong>Issuer Company Name:</strong> {selectedInvoice.issuerCompanyName}</p>
            <p><strong>Client Company Name:</strong> {selectedInvoice.clientCompanyName}</p>
            <p><strong>Issue Date:</strong> {new Date(selectedInvoice.issueDate).toDateString()}</p>
            <p><strong>Due Date:</strong> {new Date(selectedInvoice.dueDate).toDateString()}</p>
            <p><strong>Status:</strong> {selectedInvoice.status}</p>

            <h3 className="text-xl font-bold mt-4 mb-2">Items</h3>
            {selectedInvoice.lineItems.map((item: any, index: number) => (
              <div key={index} className="mb-2">
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Unit Price:</strong> {item.unitPrice}</p>
                <p><strong>Total Amount:</strong> {item.totalAmount}</p>
              </div>
            ))}

            <div className="flex justify-end">
              <Button onClick={() => handleExportPDF(selectedInvoice)} className="mr-2">Export as PDF</Button>
              <Button onClick={() => handleExportExcel(selectedInvoice)} className="mr-2">Export as Excel</Button>
              <Button onClick={closePopup}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {isEditFormOpen && editFormData && (
        <EditInvoiceForm
          invoice={editFormData}
          onClose={() => setIsEditFormOpen(false)}
          onSave={updatedInvoice => {
            setInvoices(prev => prev.map(invoice =>
              invoice.id === updatedInvoice.id ? updatedInvoice : invoice
            ));
            setIsEditFormOpen(false);
          }}
        />
      )}

      <Paginate
        currentPage={currentPage}
        totalItems={invoices.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InvoiceTable;
