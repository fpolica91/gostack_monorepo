import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import logo from '~/assets/1581704670044-attachment.svg'
import { Link } from 'react-router-dom'
import { signUpRequest } from '~/store/modules/auth/actions'

const schema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  email: Yup.string()
    .email('insert a valid email')
    .required('email is required'),
  password: Yup.string()
    .min(6, 'minimum 6 characters')
    .required('password is required')
})

export default function Signup() {
  const dispatch = useDispatch()

  function handleSignUp({ name, email, password }) {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <>
      <img src={logo} alt="goBarber" />
      <Form schema={schema} onSubmit={handleSignUp}>
        <Input name="name" type="text" placeholder="Full Name" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">Create Account</button>
        <Link to="/">Already Have An Account</Link>
      </Form>
    </>
  )
}
