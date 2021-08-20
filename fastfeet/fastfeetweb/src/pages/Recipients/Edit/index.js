/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import history from '~/services/history'
import { Container, Controls, SaveButton, ReturnButton } from './styles'
import { Form } from '@unform/web'
import { updateRecipientRequest } from '~/store/modules/recipient/actions'
import { useDispatch } from 'react-redux'
import Input from '~/components/Inputs/index'

export default function updateRecipient(props) {
  const dispatch = useDispatch()
  console.log(props)
  const { recipient } = props.history.location.state

  function handleUpdate(data) {
    const obj = Object.assign({
      ...data,
      id: props.match.params.id,
    })

    dispatch(updateRecipientRequest(obj))
  }

  return (
    <>
      <Controls>
        <div>
          <h2>Register Recipient</h2>
          <div>
            <SaveButton type="submit" form="my-form">
              Save
            </SaveButton>
            <ReturnButton onClick={() => history.push('/recipients')}>
              Return
            </ReturnButton>
          </div>
        </div>
      </Controls>

      <Container>
        <Form id="my-form" onSubmit={handleUpdate} initialData={recipient}>
          <Input type="text" name="name" label="full name" />
          <div>
            <Input type="text" name="street" label="112 via aurelia" />
            <Input name="city" label="West Palm Beach" />
          </div>
          <div>
            <Input name="state" label="Florida" />
            <Input name="zip" label="33411" />
            <Input name="number" label="5612733977" />
          </div>
        </Form>
      </Container>
    </>
  )
}
