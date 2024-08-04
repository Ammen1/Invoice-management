"use client";

import { call, all, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
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
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from '../features/invoiceSlice';

// Base URL for the API
const BASE_URL = 'http://localhost:4000';

// Generic API call handler
function* apiCall(method: string, url: string, data?: unknown, token?: string) {
  try {
    const config = {
      method,
      url,
      data,
      headers: token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
    };
    const response = yield call(axios, config);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// Fetch Invoices
function* fetchInvoicesSaga() {
  try {
    const token = localStorage.getItem('access_token');
    const data = yield call(apiCall, 'GET', `${BASE_URL}/invoices`, undefined, token);
    if (data.success && Array.isArray(data.invoices)) {
      yield put(fetchInvoicesSuccess(data.invoices));
    } else {
      yield put(fetchInvoicesFailure('Failed to fetch invoices'));
    }
  } catch (error: any) {
    yield put(fetchInvoicesFailure(error.message));
  }
}

// Add Invoice
function* addInvoiceSaga(action: ReturnType<typeof addInvoiceStart>) {
  try {
    const token = localStorage.getItem('access_token');
    const data = yield call(apiCall, 'POST', `${BASE_URL}/invoices`, action.payload, token);
    if (data.success && data.invoice) {
      yield put(addInvoiceSuccess(data.invoice));
    } else {
      yield put(addInvoiceFailure('Failed to add invoice'));
    }
  } catch (error: any) {
    yield put(addInvoiceFailure(error.message));
  }
}

// Update Invoice
function* updateInvoiceSaga(action: ReturnType<typeof updateInvoiceStart>) {
  try {
    const token = localStorage.getItem('access_token');
    const data = yield call(apiCall, 'PUT', `${BASE_URL}/invoices/${action.payload._id}`, action.payload, token);
    if (data.success && data.invoice) {
      yield put(updateInvoiceSuccess(data.invoice));
    } else {
      yield put(updateInvoiceFailure('Failed to update invoice'));
    }
  } catch (error: any) {
    yield put(updateInvoiceFailure(error.message));
  }
}

// Delete Invoice
function* deleteInvoiceSaga(action: ReturnType<typeof deleteInvoiceStart>) {
  try {
    const token = localStorage.getItem('access_token');
    const data = yield call(apiCall, 'DELETE', `${BASE_URL}/invoices/${action.payload}`, undefined, token);
    if (data.success) {
      yield put(deleteInvoiceSuccess(action.payload));
    } else {
      yield put(deleteInvoiceFailure('Failed to delete invoice'));
    }
  } catch (error: any) {
    yield put(deleteInvoiceFailure(error.message));
  }
}

// Fetch Statistics
function* fetchStatisticsSaga() {
  try {
    const token = localStorage.getItem('access_token');
    const data = yield call(apiCall, 'GET', `${BASE_URL}/invoices/statistics`, undefined, token);
    if (data) {
      yield put(fetchStatisticsSuccess(data));
    } else {
      yield put(fetchStatisticsFailure('Failed to fetch statistics'));
    }
  } catch (error: any) {
    yield put(fetchStatisticsFailure(error.message));
  }
}

// Watcher Sagas
function* watchFetchInvoices() {
  yield takeEvery(fetchInvoicesStart.type, fetchInvoicesSaga);
}

function* watchAddInvoice() {
  yield takeEvery(addInvoiceStart.type, addInvoiceSaga);
}

function* watchUpdateInvoice() {
  yield takeEvery(updateInvoiceStart.type, updateInvoiceSaga);
}

function* watchDeleteInvoice() {
  yield takeEvery(deleteInvoiceStart.type, deleteInvoiceSaga);
}

function* watchFetchStatistics() {
  yield takeEvery(fetchStatisticsStart.type, fetchStatisticsSaga);
}

// Root Saga
export default function* rootSaga() {
  yield all([
    watchFetchInvoices(),
    watchAddInvoice(),
    watchUpdateInvoice(),
    watchDeleteInvoice(),
    watchFetchStatistics(),
  ]);
}
