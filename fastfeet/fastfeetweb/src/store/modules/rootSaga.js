import { all } from 'redux-saga/effects'
import auth from './auth/sagas'
import order from './order/sagas'
import recipient from './recipient/sagas'
import courier from './courier/sagas'
export default function* rootSaga() {
  return yield all([auth, order, recipient,courier])
}
