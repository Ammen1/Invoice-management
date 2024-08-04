"use client";

import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import invoiceSaga from './invoiceSagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    invoiceSaga(),
  ]);
}


