import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Button } from './ui/button';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  issuerCompanyName: string;
  issuerAddress: string;
  issuerCity: string;
  issuerCountry: string;
  issuerContactName: string;
  clientCompanyName: string;
  clientAddress: string;
  clientCity: string;
  clientCountry: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  companyLogoUrl: string;
  status: string;
}

interface EditInvoiceFormProps {
  invoice: Invoice;
  onClose: () => void;
  onSave: (updatedInvoice: Invoice) => void;
}

const EditInvoiceForm: React.FC<EditInvoiceFormProps> = ({ invoice, onClose, onSave }) => {
  const [formData, setFormData] = useState<Invoice>({
    ...invoice,
    items: invoice.items || [], 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/invoices/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      onSave(formData);
    } catch (error) {
      console.error('Failed to update invoice', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-gray-900 to-neutral-600 via-blackbg-opacity-60 flex items-center justify-center z-50">
      <div className=" border  border-gray-300 p-6 rounded-lg shadow-lg w-full max-w-4xl h-full max-h-screen overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Invoice</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="issuerCompanyName" className="block text-sm font-medium mb-1">Issuer Company Name</label>
            <input
              id="issuerCompanyName"
              name="issuerCompanyName"
              type="text"
              value={formData.issuerCompanyName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="issuerAddress" className="block text-sm font-medium mb-1">Issuer Address</label>
            <input
              id="issuerAddress"
              name="issuerAddress"
              type="text"
              value={formData.issuerAddress}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="issuerCity" className="block text-sm font-medium mb-1">Issuer City</label>
            <input
              id="issuerCity"
              name="issuerCity"
              type="text"
              value={formData.issuerCity}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="issuerCountry" className="block text-sm font-medium mb-1">Issuer Country</label>
            <input
              id="issuerCountry"
              name="issuerCountry"
              type="text"
              value={formData.issuerCountry}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="issuerContactName" className="block text-sm font-medium mb-1">Issuer Contact Name</label>
            <input
              id="issuerContactName"
              name="issuerContactName"
              type="text"
              value={formData.issuerContactName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientCompanyName" className="block text-sm font-medium mb-1">Client Company Name</label>
            <input
              id="clientCompanyName"
              name="clientCompanyName"
              type="text"
              value={formData.clientCompanyName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientAddress" className="block text-sm font-medium mb-1">Client Address</label>
            <input
              id="clientAddress"
              name="clientAddress"
              type="text"
              value={formData.clientAddress}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientCity" className="block text-sm font-medium mb-1">Client City</label>
            <input
              id="clientCity"
              name="clientCity"
              type="text"
              value={formData.clientCity}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientCountry" className="block text-sm font-medium mb-1">Client Country</label>
            <input
              id="clientCountry"
              name="clientCountry"
              type="text"
              value={formData.clientCountry}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="invoiceNumber" className="block text-sm font-medium mb-1">Invoice Number</label>
            <input
              id="invoiceNumber"
              name="invoiceNumber"
              type="text"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="issueDate" className="block text-sm font-medium mb-1">Issue Date</label>
            <input
              id="issueDate"
              name="issueDate"
              type="date"
              value={formData.issueDate.split('T')[0]} 
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate.split('T')[0]} 
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyLogoUrl" className="block text-sm font-medium mb-1">Company Logo URL</label>
            <input
              id="companyLogoUrl"
              name="companyLogoUrl"
              type="text"
              value={formData.companyLogoUrl}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Invoice Items */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Invoice Items</label>
            {Array.isArray(formData.items) && formData.items.map((item, index) => (
              <div key={index} className="mb-4 border p-4 rounded-md">
                <div className="mb-2">
                  <label htmlFor={`itemDescription${index}`} className="block text-sm font-medium mb-1">Description</label>
                  <input
                    id={`itemDescription${index}`}
                    name="description"
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`itemQuantity${index}`} className="block text-sm font-medium mb-1">Quantity</label>
                  <input
                    id={`itemQuantity${index}`}
                    name="quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`itemPrice${index}`} className="block text-sm font-medium mb-1">Price</label>
                  <input
                    id={`itemPrice${index}`}
                    name="price"
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Item
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="text-blue-500 hover:text-blue-700"
            >
              Add Item
            </button>
          </div>

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="mr-2">Save</Button>
            <Button type="button" onClick={onClose} className="bg-gray-500">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoiceForm;
