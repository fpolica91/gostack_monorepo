import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import logo from '~/assets/1581704670044-attachment.svg'
import { Link } from 'react-router-dom'
import { signInRequest } from '~/store/modules/auth/actions'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('insert a valid email')
    .required('email is required'),
  password: Yup.string().required('password is required')
})

export default function SignIn() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  return (
    <>
      <img src={logo} alt="goBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">{loading ? 'Loading...' : 'Log In'}</button>
        <Link to="/register">Create An Account</Link>
      </Form>
    </>
  )
}
