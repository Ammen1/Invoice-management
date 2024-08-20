
export interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
    totalAmount: number;
    taxAmount: number;
  }
  
  export interface Invoice {
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
    issueDate: Date;
    dueDate: Date;
    items: InvoiceItem[];
    companyLogoUrl: string;
  }
  