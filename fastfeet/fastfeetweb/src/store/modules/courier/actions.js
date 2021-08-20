export function updateCourierRequest(data) {
    return {
      type: `@courier/UPDATE_COURIER_REQUEST`,
      payload: { data },
    }
  }
  
  export function updateCourierSuccess(courier) {
    return {
      type: `@order/UPDATE_COURIER_SUCCESS`,
      payload: { courier },
    }
  }
  