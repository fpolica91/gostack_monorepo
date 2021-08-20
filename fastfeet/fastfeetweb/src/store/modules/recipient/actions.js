export function updateRecipientRequest(data) {
  return {
    type: `@recipient/UPDATE_RECIPIENT_REQUEST`,
    payload: { data },
  }
}

export function updateRecipientSuccess(recipient) {
  return {
    type: `@recipient/UPDATE_RECIPIENT_SUCCESS`,
    payload: { recipient },
  }
}
