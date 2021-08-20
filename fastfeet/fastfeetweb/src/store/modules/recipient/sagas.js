import { all, takeLatest, call, put } from 'redux-saga/effects'
import api from '~/services/api'
import history from '~/services/history'
import { updateRecipientSuccess } from './actions'

export function* updateRecipient({ payload }) {
  try {
    const { name, id, ...rest } = payload.data
    const response = yield call(api.put, `update/${id}`, {
      name,
      id,
      ...rest,
    })
    yield put(updateRecipientSuccess(response.data))
    history.goBack()
  } catch (err) {
    throw new Error(err)
  }
}

export default all([
  takeLatest(`@recipient/UPDATE_RECIPIENT_REQUEST`, updateRecipient),
])
