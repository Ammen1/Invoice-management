"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../forms/SubmitButton";
import { Form } from "../ui/form";
import { InvoiceFormValidation } from "@/lib/validation";
import { HiTrash } from "react-icons/hi";
import { Button } from "../ui/button";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  addInvoiceStart,
  updateInvoiceStart,
} from "@/features/invoiceSlice";

const InvoiceForm = ({
  userId,
  invoice,
  type = "create",
  setOpen,
}: {
  userId: string;
  invoice?: any; // Consider defining a type for invoice
  type: "create" | "edit";
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof InvoiceFormValidation>>({
    resolver: zodResolver(InvoiceFormValidation),
    defaultValues: {
      issuerCompanyName: invoice?.issuerCompanyName || "",
      issuerAddress: invoice?.issuerAddress || "",
      issuerCity: invoice?.issuerCity || "",
      issuerCountry: invoice?.issuerCountry || "",
      issuerContactName: invoice?.issuerContactName || "",
      clientCompanyName: invoice?.clientCompanyName || "",
      clientAddress: invoice?.clientAddress || "",
      clientCity: invoice?.clientCity || "",
      clientCountry: invoice?.clientCountry || "",
      invoiceNumber: invoice?.invoiceNumber || "",
      issueDate: invoice ? new Date(invoice.issueDate) : new Date(),
      dueDate: invoice ? new Date(invoice.dueDate) : new Date(),
      items: invoice?.items || [{ description: "", quantity: 1, price: 0, totalAmount:0, taxAmount:0 }],
      companyLogoUrl: invoice?.companyLogoUrl || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    if (invoice) {
      form.reset({
        issuerCompanyName: invoice.issuerCompanyName || "",
        issuerAddress: invoice.issuerAddress || "",
        issuerCity: invoice.issuerCity || "",
        issuerCountry: invoice.issuerCountry || "",
        issuerContactName: invoice.issuerContactName || "",
        clientCompanyName: invoice.clientCompanyName || "",
        clientAddress: invoice.clientAddress || "",
        clientCity: invoice.clientCity || "",
        clientCountry: invoice.clientCountry || "",
        invoiceNumber: invoice.invoiceNumber || "",
        issueDate: new Date(invoice.issueDate),
        dueDate: new Date(invoice.dueDate),
        items: invoice.items || [{ description: "", quantity: 1, price: 0, totalAmount:0, taxAmount:0 }],
        companyLogoUrl: invoice.companyLogoUrl || "",
      });
    }
  }, [invoice]);

  const onSubmit = async (values: z.infer<typeof InvoiceFormValidation>) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const parsedValues = {
        issuerCompanyName: values.issuerCompanyName,
        issuerContactName: values.issuerContactName,
        issuerAddress: values.issuerAddress,
        issuerCity: values.issuerCity,
        issuerCountry: values.issuerCountry,
        clientCompanyName: values.clientCompanyName,
        clientAddress: values.clientAddress,
        clientCity: values.clientCity,
        clientCountry: values.clientCountry,
        invoiceNumber: values.invoiceNumber,
        issueDate: values.issueDate.toISOString(),
        dueDate: values.dueDate.toISOString(),
        companyLogoUrl: values.companyLogoUrl || "",
        status: "PENDING",
        lineItems: values.items.map(item => ({
          description: item.description,
          quantity: parseInt(item.quantity, 10),
          unitPrice: parseFloat(item.price),
          taxAmount: 0,
          totalAmount: parseFloat(item.quantity) * parseFloat(item.price),
        })),
      };

      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        throw new Error("No access token found");
      }

      if (type === "create") {
        await dispatch(addInvoiceStart({ ...parsedValues, userId, accessToken }));
      } else {
        await dispatch(updateInvoiceStart({ ...parsedValues, accessToken }));
      }

      router.push('/');
      if (setOpen) setOpen(false);
    } catch (error: any) {
      setFormError(error.message || "Failed to submit invoice.");
      console.error("Failed to submit invoice:", error);
    }
    
    setIsLoading(false);
  };

  const buttonLabel = type === "edit" ? "Update Invoice" : "Create Invoice";

  return (
    <div className="flex items-center justify-center mt-14 min-h-screen">
      <div className="w-full max-w-4xl bg-gradient-to-r from-gray-900 to-neutral-600 via-black p-8 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section className="mb-8 text-center">
              <h1 className="text-2xl font-semibold mb-2">
                {type === "create" ? "New Invoice" : "Edit Invoice"}
              </h1>
              <p className="text-white">
                {type === "create" ? "Create a new invoice quickly." : "Edit the invoice details below."}
              </p>
            </section>

            {/* Form Fields */}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="issuerCompanyName"
              label="Issuer Company Name"
              placeholder="Issuer Company Name"
            />
            <section className="flex space-x-7">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="issuerContactName"
                label="Issuer Contact Name"
                placeholder="Issuer Contact Name"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="issuerAddress"
                label="Issuer Address"
                placeholder="Issuer Address"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="issuerCity"
                label="Issuer City"
                placeholder="Issuer City"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="issuerCountry"
                label="Issuer Country"
                placeholder="Issuer Country"
              />
            </section>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="clientCompanyName"
              label="Client Company Name"
              placeholder="Client Company Name"
            />
            <section className="flex space-x-7">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="clientAddress"
                label="Client Address"
                placeholder="Client Address"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="clientCity"
                label="Client City"
                placeholder="Client City"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="clientCountry"
                label="Client Country"
                placeholder="Client Country"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="companyLogoUrl"
                label="Company Logo URL"
                placeholder="Company Logo URL"
                type="text"
              />
            </section>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="invoiceNumber"
              label="Invoice Number"
              placeholder="Invoice Number"
              type="number"
            />
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="issueDate"
              label="Issue Date"
            />
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dueDate"
              label="Due Date"
            />
            <section>
              <h2 className="text-xl font-semibold mb-4">Items</h2>
              {fields.map((item, index) => (
                <div key={item.id} className="border-e-2 hover:border-e-4 bg-gradient-to-r to-slate-800 via-green-900 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Item {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-white hover:text-red-900 flex items-center"
                    >
                      <HiTrash className="w-7 h-8" />
                      <span className="ml-2">Remove</span>
                    </button>
                  </div>
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name={`items.${index}.description`}
                    label="Description"
                    placeholder="Description"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name={`items.${index}.quantity`}
                    label="Quantity"
                    placeholder="Quantity"
                    type="number"
                    step="1"
                    min="0"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name={`items.${index}.price`}
                    label="Price"
                    placeholder="Price"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => append({ description: "", quantity: 1, price: 0 })}
                className="text-white bg-gradient-to-r from-purple-100 to-pink-900 via-indigo-700 hover:bg-gradient-to-br hover:to-indigo-950 hover:via-pink-950 flex items-center"
              >
                <span className="text-lg font-extrabold">Add Item</span>
              </Button>
            </section>
            {formError && (
              <section className="text-red-500 text-center">
                <p>{formError}</p>
              </section>
            )}
            <section className="flex items-center justify-center">
              <SubmitButton
                isLoading={isLoading}
                className="bg-gradient-to-r from-purple-900 to-pink-900 via-indigo-900 hover:bg-gradient-to-br hover:to-indigo-950 hover:via-pink-950 text-white"
              >
                <span className="text-white font-lg">{buttonLabel}</span>
              </SubmitButton>
            </section>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InvoiceForm;
