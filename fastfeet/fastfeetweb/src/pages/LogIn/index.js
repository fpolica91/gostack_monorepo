import React from 'react'
import logo from '~/assets/fastfeet-logo.png'
import { Form, Input } from '@rocketseat/unform'
import { useDispatch } from 'react-redux'
import { signInRequest } from '~/store/modules/auth/actions'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('insert a valid email here')
    .required('email is required'),
  password: Yup.string().required('password is')
})

export default function LogIn() {
  const dispatch = useDispatch()

  function handleSubmit({ email, password }) {
    console.tron.log(email, password)
    dispatch(signInRequest(email, password))
  }

  return (
    <div>
      <img src={logo} alt="fastfeet logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">Access Systen</button>
      </Form>
    </div>
  )
}
