import produce from 'immer'

const INITIAL_STATE = {
  courier: null,
}

export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `@couier/UPDATE_COURIER_SUCCESS`:
      return produce(state, (draft) => {
        draft.courier = action.payload.courier
      })

    default:
      return state
  }
}
