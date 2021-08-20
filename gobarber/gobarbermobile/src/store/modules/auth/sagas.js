import {takeLatest, all, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '../../../services/api';
import history from '~/services/history';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    if (user.provider) {
      Alert.alert('User cannot be a service provider');
      yield put(signFailure());
      return;
    }
    // sets token so requests can be made
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    Alert.alert('Success', 'Succesfully Logged In');
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'login error',
      'Error  authenticating, check email/password  and  try again',
    );
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;
    yield call(api.post, 'create', {
      name,
      email,
      password,
    });

    Alert.alert('Success', 'Successfully registered user!');

    // history.push('/');
  } catch (err) {
    Alert.alert('Error', 'Error creating account!');
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return;
  const {token} = payload.auth;
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function signOut() {}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
