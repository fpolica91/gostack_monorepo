import React from 'react'
import { Form } from '@unform/web'
import Select from '../Create/Components/Select'
import Input from '../Create/Components/Input'
import { useDispatch } from 'react-redux'
import { updateOrderRequest } from '~/store/modules/order/actions'
import history from '~/services/history'
import { Container, Controls, SaveButton, ReturnButton } from './styles'

export default function EditOrder({ location }) {
  const { state } = location
  const { order } = state
  console.log(order.id)
  const dispatch = useDispatch()

  function handleSubmit(data) {
    const _data = Object.assign({ data }, { id: order.id })
    dispatch(updateOrderRequest(_data))
  }

  function handleNavigate(path) {
    history.push(`/${path}`)
  }

  return (
    <>
      <Controls>
        <div>
          <h2>Update Orders</h2>
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
        <Form id="my-form" onSubmit={handleSubmit} initialData={order}>
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
