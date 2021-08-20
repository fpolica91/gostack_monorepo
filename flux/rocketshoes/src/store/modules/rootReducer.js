import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart
});

// THIS FILE IS CREATED IN ORDER TO MAINTAIN MULTIPLE REDUCERS, ANYTIME A NEW REDUCER IS CREATED
// IT CAN BE IMPORTED HERE AND MADE AVAILABLE THRU THE ENTIRE APPLICATION
