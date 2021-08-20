import { all, takeLatest, call, put } from 'redux-saga/effects'
import api from '~/services/api'
import history from '~/services/history'
import { updateCourierSuccess } from './actions'

export function* updateCourier({ payload }) {
  try {
    const { id, file_id, name, email, ...rest } = payload.data
    const response = yield call(api.put, `couriers/${id}`, {
      name,
      email,
      file_id,
      ...rest,
    })
    yield put(updateCourierSuccess(response.data))
    history.goBack()
  } catch (err) {
    throw new Error(err)
  }
}

export default all([
  takeLatest(`@courier/UPDATE_COURIER_REQUEST`, updateCourier),
])
