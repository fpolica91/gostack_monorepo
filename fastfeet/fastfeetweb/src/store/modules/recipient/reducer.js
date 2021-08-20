import produce from 'immer'

const INITIAL_STATE = {
  recipient: null,
}

export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `@recipient/UPDATE_RECIPIENT_SUCCESS`:
      return produce(state, (draft) => {
        draft.recipient = action.payload.recipient
      })

    default:
      return state
  }
}
