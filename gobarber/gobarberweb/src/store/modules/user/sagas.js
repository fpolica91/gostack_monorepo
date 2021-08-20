import { all, takeLatest, call, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import api from '~/services/api'
import { updateProfileSuccess, updateProfileFailure } from './actions'

export function* updateProfile({ payload }) {
  try {
    const { name, email, file_id, ...rest } = payload.data
    const profile = Object.assign(
      { name, email, file_id },
      rest.oldPassword ? rest : {}
    )
    console.log(profile)
    const response = yield call(api.put, 'update', profile)
    yield put(updateProfileSuccess(response.data))
    toast.success('Profile Updated')
  } catch (err) {
    toast.error('Unexpected Error')
    yield put(updateProfileFailure())
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)])
