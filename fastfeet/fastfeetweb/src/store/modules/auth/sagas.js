import { takeLatest, all, call, put } from 'redux-saga/effects'
import api from '~/services/api'
import history from '~/services/history'
import { singInSuccess, signFailure } from './actions'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload
    const response = yield call(api.post, 'sessions', {
      email,
      password
    })
    const { user, token } = response.data
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    yield put(singInSuccess(token, user))
    history.push('/orders')
  } catch (error) {
    yield put(signFailure())
    history.push('/')
  }
}
export function setToken({ payload }) {
  if (!payload) return
  const { token } = payload.auth
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}

export default all([
  takeLatest(`persist/REHYDRATE`, setToken),
  takeLatest(`@auth/SIGN_IN_REQUEST`, signIn)
])
