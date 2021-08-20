import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from './styles'
import { updateProfileRequest } from '~/store/modules/user/actions'
import { signOut } from '~/store/modules/auth/actions'
import Avatar from './Avatar/index'
import { Form, Input } from '@rocketseat/unform'

export default function Profile() {
  const profile = useSelector(state => state.user.profile)
  const dispatch = useDispatch()

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data))
  }

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Avatar name="file_id" />
        <Input name="name" placeholder="full name" />
        <Input name="email" type="email" placeholder="email" />

        <hr />
        <Input type="password" name="oldPassword" placeholder="Old Password" />
        <Input type="password" name="password" placeholder="New Password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit">Update Profile</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Log Out
      </button>
    </Container>
  )
}
