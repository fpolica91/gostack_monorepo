import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import {price} from '../../../utils/format';
import {addItemToCartSuccess, updateCartSuccess} from './actions';

function* addTocart({id}) {
  const alreadyInCart = yield select(state =>
    state.cart.find(p => p.id === id),
  );
  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentInCart = alreadyInCart ? alreadyInCart.amount : 0;
  const amount = currentInCart + 1;
  if (amount > stockAmount) {
    alert('item not in stock');
    return;
  }
  if (alreadyInCart) {
    yield put(updateCartSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      formattedPrice: price(response.data.price),
    };
    yield put(addItemToCartSuccess(data));
  }
}

function* updateAmount({id, amount}) {
  if (amount <= 0) {
    return;
  }
  const stock = yield call(api.get, `/stock/${id}`);

  if (amount > stock.data.amount) {
    alert('item not in stock');
    return;
  }
  yield put(updateCartSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_TO_CART_REQUEST', addTocart),
  takeLatest('@cart/UPDATE_CART_REQUEST', updateAmount),
]);
