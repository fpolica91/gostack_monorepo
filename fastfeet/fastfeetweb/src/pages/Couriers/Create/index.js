import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import Avatar from './Avatar/index'
import { toast } from 'react-toastify'
import { Container, SaveButton, ReturnButton, Controls } from './styles'
import api from '~/services/api'
import history from '~/services/history'

const schema = Yup.object().shape({
  name: Yup.string().required('Please specify your name'),
  email: Yup.string()
    .email('Insert a valid email')
    .required('Email is required'),
  file_id: Yup.number(),
})

export default function Create() {
  async function handleSubmit({ name, email, file_id }) {
    console.log(name, email, file_id)
    try {
      await api.post(`/couriers`, { email, name, file_id })
      toast.success('Order succesfully created')
      history.push('/couriers')
    } catch (err) {
      toast.error('Error creating order')
    }
  }

  return (
    <>
      <Controls>
        <div>
          <h2>Register Courier</h2>
          <div>
            <SaveButton type="submit" form="my-form">
              Save
            </SaveButton>
            <ReturnButton onClick={() => history.push('/couriers')}>
              Return
            </ReturnButton>
          </div>
        </div>
      </Controls>

      <Container>
        <Form id="my-form" schema={schema} onSubmit={handleSubmit}>
          <Avatar name="file_id" />
          <Input name="name" type="name" placeholder="John Doe" />
          <Input name="email" type="email" placeholder="Email" />
        </Form>
      </Container>
    </>
  )
}
