import React from 'react'
import api from '~/services/api'
import history from '~/services/history'
import { Container, Controls, SaveButton, ReturnButton } from './styles'
import { Form } from '@unform/web'
import Input from '~/components/Inputs/index'

export default function CreateRecipient() {
  async function handleSubmit({ name, number, ...rest }) {
    await api.post('recipient', { name, number, ...rest })
    history.push('/recipients')
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
        <Form id="my-form" onSubmit={handleSubmit}>
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
