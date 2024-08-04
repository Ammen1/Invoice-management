import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure, signupRequest, signupSuccess, signupFailure } from '../features/authSlice';

const API_URL = 'http://localhost:4000';

function* loginWorker(action: ReturnType<typeof loginRequest>) {
  try {
    const response = yield call(axios.post, `${API_URL}/users/signin`, action.payload);
    const { access_token, email } = response.data;
    yield put(loginSuccess({ access_token, email }));
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('email', email);
  } catch (error) {
    console.error('Login failed', error);
    yield put(loginFailure('Login failed. Please try again.'));
  }
}

function* signupWorker(action: ReturnType<typeof signupRequest>) {
  try {
    const response = yield call(axios.post, `${API_URL}/users/signup`, action.payload);
    const { access_token, email } = response.data;
    yield put(signupSuccess({ access_token, email }));
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('email', email);
  } catch (error) {
    console.error('Signup failed', error);
    yield put(signupFailure('Signup failed. Please try again.'));
  }
}

function* authSaga() {
  yield takeEvery(loginRequest.type, loginWorker);
  yield takeEvery(signupRequest.type, signupWorker);
}

export default authSaga;
