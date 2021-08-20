// * this is a generator, in our case generator replaces async/await
// this will be called before the reducer, and this will call the reducer
import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { addToCartSucess, updateAmountSuccess } from './actions';
import { price } from '../../../util/format';

// when the user clicks the button the first thing that place is this function being called
// ADD_REQUEST searches the database for the product, and once the product is found
// it calls calls addToCartSucess which in return calls our reducer

function* addToCart({ id }) {
  // to see if the product with the given ID is already in the cart
  const productIsAlreadyInCart = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  const currentAmount = productIsAlreadyInCart
    ? productIsAlreadyInCart.amount
    : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Product not in stock');
    return;
  }

  // if product is in cart simply call the updateAmount function
  if (productIsAlreadyInCart) {
    // increase the amount of products by 1, without adding any additional value
    // const amount = productIsAlreadyInCart.amount + 1;
    yield put(updateAmountSuccess(id, amount));
    // if the product is being added for the first time
  } else {
    // call to do api calls, you cannot do api.get()
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      formatedPrice: price(response.data.price)
    };
    // use put to fire the action
    yield put(addToCartSucess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;
  // const product = yield select(state => state.cart.find(p => p.id === id));
  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Product not in stock');
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}

// @ all, you can register listeners here,
// @ take latest takes the last click, in case user clicks multiple times before api call.
// saves resources, only last call will be made, opposite is @ takeEvery

// this will listen for add request, which is the function called when user clicks

export default all([
  takeLatest(`@cart/ADD_REQUEST`, addToCart),
  takeLatest(`@cart/UPDATE_AMOUNT_REQUEST`, updateAmount)
]);
