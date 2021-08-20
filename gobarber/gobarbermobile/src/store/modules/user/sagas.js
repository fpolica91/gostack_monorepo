import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '../../../services/api';
import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, email, ...rest} = payload.data;
    const profile = Object.assign({name, email}, rest.oldPassword ? rest : {});

    const response = yield call(api.put, 'update', profile);
    Alert.alert('Succes', 'Successfully updated profile');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Error', 'Error updating profule');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
