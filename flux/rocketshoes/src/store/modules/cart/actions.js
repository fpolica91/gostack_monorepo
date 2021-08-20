export function removeFromCart(product) {
  return {
    type: 'REMOVE_FROM_CART',
    product
  };
}

// THIS IS WHAT SAGA CALLS AFTER THE API CALL
export function addToCartSucess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product
  };
}

// THIS CALLS THE SAGA, IT FIRES WHEN THE USER CLICKS THE ADD BUTTON
export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount
  };
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount
  };
}
