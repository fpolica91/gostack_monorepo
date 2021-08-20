export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE_ITEM',
    id,
  };
}

export function updateCartSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_CART_SUCCESS',
    id,
    amount,
  };
}

export function updateCartRequest(id, amount) {
  return {
    type: '@cart/UPDATE_CART_REQUEST',
    id,
    amount,
  };
}

export function addItemToCartSuccess(product) {
  return {
    type: '@cart/ADD_TO_CART_SUCCESS',
    product,
  };
}

export function addItemToCartRequest(id) {
  return {
    type: '@cart/ADD_TO_CART_REQUEST',
    id,
  };
}
