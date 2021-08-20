import React from 'react'
import { Form } from '@unform/web'
import Select from './Components/Select'
import Input from './Components/Input'
import api from '~/services/api'
import history from '~/services/history'
import { Container, Controls, SaveButton, ReturnButton } from './styles'

export default function CreateOrder() {
  async function handleSubmit({ courier_id, recipient_id, product }) {
    await api.post('orders', { recipient_id, courier_id, product })
    handleNavigate('orders')
  }

  function handleNavigate(path) {
    history.push(`/${path}`)
  }

  return (
    <>
      <Controls>
        <div>
          <h2>Register Orders</h2>
          <div>
            <SaveButton type="submit" form="my-form">
              Save
            </SaveButton>
            <ReturnButton onClick={() => handleNavigate('orders')}>
              Return
            </ReturnButton>
          </div>
        </div>
      </Controls>

      <Container>
        <Form id="my-form" onSubmit={handleSubmit}>
          <Select label="Courier" name="courier_id" path={`/couriers?name`} />

          <Select
            label="Recipient"
            name="recipient_id"
            path={`recipients/?name`}
          />

          <Input label="Product" name="product" />
        </Form>
      </Container>
    </>
  )
}
