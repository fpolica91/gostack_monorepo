import { combineReducers } from 'redux'
import auth from './auth/reducer'
import admin from './admin/reducer'
import order from './order/reducers'
import recipient from './recipient/reducer'
import courier from './courier/reducers'
export default combineReducers({
  auth,
  admin,
  order,
  recipient,
  courier
})
