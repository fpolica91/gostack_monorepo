import produce from 'immer'

const INITIAL_STATE = {
  order: null,
}

export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `@order/UPDATE_ORDER_SUCCESS`:
      return produce(state, (draft) => {
        draft.order = action.payload.order
      })

    default:
      return state
  }
}
