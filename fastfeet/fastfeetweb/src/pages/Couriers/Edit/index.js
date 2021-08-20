import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import Avatar from '~/pages/Couriers/Create/Avatar/index'
import { updateCourierRequest } from '~/store/modules/courier/actions'
import { useDispatch } from 'react-redux'
// import { toast } from 'react-toastify'
import { Container, SaveButton, ReturnButton, Controls } from './styles'
// import api from '~/services/api'
// import history from '~/services/history'

const schema = Yup.object().shape({
  name: Yup.string().required('Please specify your name'),
  email: Yup.string()
    .email('Insert a valid email')
    .required('Email is required'),
  file_id: Yup.number(),
})

export default function EditCourier({ history, match }) {
  const { courier } = history?.location?.state
  const dispatch = useDispatch()
  console.log(courier)

  async function handleUpdate(data) {
    const obj = Object.assign({ ...data, id: match.params.id })
    dispatch(updateCourierRequest(obj))
  }

  return (
    <>
      <Controls>
        <div>
          <h2>Edit Courier</h2>
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
        <Form
          id="my-form"
          schema={schema}
          onSubmit={handleUpdate}
          initialData={courier}
        >
          <Avatar name="file_id" />
          <Input name="name" type="name" placeholder="John Doe" />
          <Input name="email" type="email" placeholder="Email" />
        </Form>
      </Container>
    </>
  )
}
