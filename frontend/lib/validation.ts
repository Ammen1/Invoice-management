"use client";
import { z } from "zod";

export const UserFormValidation = z.object({
  firstname: z
    .string()
    .min(2, "Firstname must be at least 2 characters")
    .max(50, "Firstname must be at most 50 characters"),
  lastname: z
    .string()
    .min(2, "Lastname must be at least 2 characters")
    .max(50, "Lastname must be at most 50 characters"),  
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .refine(password => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
    .refine(password => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
    .refine(password => /[0-9]/.test(password), "Password must contain at least one number")
    .refine(password => /[!@#$%^&*(),.?":{}|<>]/.test(password), "Password must contain at least one special character"),
});


export const UserFormValidationLogin = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .refine(password => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
    .refine(password => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
    .refine(password => /[0-9]/.test(password), "Password must contain at least one number")
    .refine(password => /[!@#$%^&*(),.?":{}|<>]/.test(password), "Password must contain at least one special character"),
});


// Invoice Form Validation Schema
// Validation Schema
export const InvoiceFormValidation = z.object({
  issuerCompanyName: z
    .string()
    .min(2, "Issuer company name must be at least 2 characters")
    .max(100, "Issuer company name must be at most 100 characters"),
  issuerContactName: z
    .string()
    .min(2, "Issuer contact name must be at least 2 characters")
    .max(100, "Issuer contact name must be at most 100 characters"),
  issuerAddress: z
    .string()
    .min(2, "Issuer address must be at least 2 characters")
    .max(200, "Issuer address must be at most 200 characters"),
  issuerCity: z
    .string()
    .min(2, "Issuer city must be at least 2 characters")
    .max(100, "Issuer city must be at most 100 characters"),
  issuerCountry: z
    .string()
    .min(2, "Issuer country must be at least 2 characters")
    .max(100, "Issuer country must be at most 100 characters"),
  clientCompanyName: z
    .string()
    .min(2, "Client company name must be at least 2 characters")
    .max(100, "Client company name must be at most 100 characters"),
  clientAddress: z
    .string()
    .min(2, "Client address must be at least 2 characters")
    .max(200, "Client address must be at most 200 characters"),
  clientCity: z
    .string()
    .min(2, "Client city must be at least 2 characters")
    .max(100, "Client city must be at most 100 characters"),
  clientCountry: z
    .string()
    .min(2, "Client country must be at least 2 characters")
    .max(100, "Client country must be at most 100 characters"),
  invoiceNumber: z
    .string()
    .min(1, "Invoice number must be at least 1 character")
    .max(50, "Invoice number must be at most 50 characters"),
  companyLogoUrl: z.string().url().optional(),  
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  items: z.array(
    z.object({
      description: z
        .string()
        .min(2, "Description must be at least 2 characters")
        .max(200, "Description must be at most 200 characters"),
      quantity: z.string().min(1, "Quantity must be at least 1"),
      price: z.string().min(0, "Price must be at least 0"),
    })
  ),
});


export function formatDateTime(date: Date) {
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    dateTime: date.toLocaleString(),
  };
}
