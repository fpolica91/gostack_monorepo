import { takeLatest, all, call, put } from 'redux-saga/effects'
import api from '~/services/api'
import history from '~/services/history'
import { toast } from 'react-toastify'
import { signInSuccess, signFailure } from './actions'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'sessions', {
      email,
      password
    })

    console.log(response.data)

    const { token, user } = response.data
    console.log(user)

    if (!user.provider) {
      toast.error('User is not an admin')
      return
    }
    // sets token so requests can be made
    api.defaults.headers['Authorization'] = `Bearer ${token}`

    yield put(signInSuccess(token, user))
    history.push('/dashboard')
  } catch (err) {
    toast.error('Authentication error, check email and password')
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload
    yield call(api.post, 'create', {
      name,
      email,
      password,
      provider: true
    })
    history.push('/')
  } catch (err) {
    toast.error('Error registering user, please check all fields')
    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (!payload) return
  const { token } = payload.auth
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}

export function signOut() {
  history.push('/')
}

export default all([
  takeLatest(`persist/REHYDRATE`, setToken),
  takeLatest(`@auth/SIGN_IN_REQUEST`, signIn),
  takeLatest(`@auth/SIGN_UP_REQUEST`, signUp),
  takeLatest('@auth/SIGN_OUT', signOut)
])
