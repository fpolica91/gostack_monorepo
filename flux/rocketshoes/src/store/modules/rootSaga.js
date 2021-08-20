// imported to have multiple sagas
import { all } from 'redux-saga/effects';
import cart from './cart/sagas';

// similar to rootreducer,

export default function* rootSaga() {
  return yield all([
    cart
    // any other saga goes under cart
  ]);
}
