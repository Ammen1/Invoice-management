import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import invoiceReducer from './features/invoiceSlice';
import authReducer from './features/authSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
