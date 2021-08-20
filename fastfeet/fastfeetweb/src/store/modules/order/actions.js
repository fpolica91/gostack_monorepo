export function updateOrderRequest(data) {
  return {
    type: `@order/UPDATE_ORDER_REQUEST`,
    payload: { data },
  }
}

export function updateOrderSuccess(order) {
  return {
    type: `@order/UPDATE_ORDER_SUCCESS`,
    payload: { order },
  }
}
