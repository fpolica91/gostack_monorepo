import { all, takeLatest, call, put } from 'redux-saga/effects'
import api from '~/services/api'
import history from '~/services/history'
import { updateOrderSuccess } from './actions'

export function* updateOrder({ payload }) {
  try {
    const { courier_id, recipient_id, product } = payload.data.data
    const prod = Object.assign({ courier_id, recipient_id, product })
    const response = yield call(api.put, `orders/${payload.data.id}`, prod)
    console.log(response.data)
    yield put(updateOrderSuccess(response.data))
    history.goBack()
  } catch (err) {
    throw new Error(err)
  }
}

export default all([takeLatest(`@order/UPDATE_ORDER_REQUEST`, updateOrder)])
