import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 

// Define Invoice and Statistics types
interface Invoice {
  _id: string;
  title: string;
  client: string;
  amount: number;
  dueDate: string;
  companyLogoUrl?: string;
  issuerCompanyName?: string;
  issuerAddress?: string;
  issuerCity?: string;
  issuerCountry?: string;
  issuerContactName?: string;
  clientCompanyName?: string;
  clientAddress?: string;
  clientCity?: string;
  clientCountry?: string;
  invoiceNumber?: string;
  issueDate?: string;
  items?: Array<{ description: string; quantity: number; price: number }>;
}

interface Statistics {
  totalInvoices: number;
  totalClients: number;
  totalAmount: number;
  overdueInvoices: number;
}

interface InvoiceState {
  invoices: Invoice[];
  statistics: Statistics | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  statistics: null,
  loading: false,
  error: null,
  success: null,
};

// Define a helper function for setting loading and resetting messages
const setLoadingAndResetMessages = (state: InvoiceState) => {
  state.loading = true;
  state.error = null;
  state.success = null;
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    fetchInvoicesStart: setLoadingAndResetMessages,
    fetchInvoicesSuccess(state, action: PayloadAction<Invoice[]>) {
      state.invoices = action.payload;
      state.loading = false;
      state.success = 'Invoices fetched successfully!';
    },
    fetchInvoicesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    addInvoiceStart: setLoadingAndResetMessages,
    addInvoiceSuccess(state, action: PayloadAction<Invoice>) {
      state.invoices.push(action.payload);
      state.loading = false;
      state.success = 'Invoice added successfully!';
    },
    addInvoiceFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    updateInvoiceStart: setLoadingAndResetMessages,
    updateInvoiceSuccess(state, action: PayloadAction<Invoice>) {
      state.invoices = state.invoices.map(invoice =>
        invoice._id === action.payload._id ? action.payload : invoice
      );
      state.loading = false;
      state.success = 'Invoice updated successfully!';
    },
    updateInvoiceFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    deleteInvoiceStart: setLoadingAndResetMessages,
    deleteInvoiceSuccess(state, action: PayloadAction<string>) {
      state.invoices = state.invoices.filter(invoice => invoice._id !== action.payload);
      state.loading = false;
      state.success = 'Invoice deleted successfully!';
    },
    deleteInvoiceFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    resetInvoiceState(state) {
      state.success = null;
      state.error = null;
    },
    fetchStatisticsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess(state, action: PayloadAction<Statistics>) {
      state.statistics = action.payload;
      state.loading = false;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchInvoicesStart,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
  addInvoiceStart,
  addInvoiceSuccess,
  addInvoiceFailure,
  updateInvoiceStart,
  updateInvoiceSuccess,
  updateInvoiceFailure,
  deleteInvoiceStart,
  deleteInvoiceSuccess,
  deleteInvoiceFailure,
  resetInvoiceState,
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = invoiceSlice.actions;

export const selectInvoiceState = (state: RootState): InvoiceState => state.invoices;

export default invoiceSlice.reducer;
