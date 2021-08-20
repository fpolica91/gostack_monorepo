import React, { useCallback, useRef, ChangeEvent } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Container, Content, AnimationContainer, AvatarInput } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import * as Yup from 'yup'
import api from '../../services/api'
import { useToast } from '../../context/toast'
import { useAuth } from '../../context/AuthContext'
import getValidationErrors from '../../utils/getValidationErrors'
import { Link } from 'react-router-dom'

const Profile: React.FC = () => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  formRef.current?.setErrors({})
  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('name is required'),
          email: Yup.string()
            .email()
            .required('email is required')
            .email('enter a valid email'),
          password: Yup.string().min(6),
        })
        await schema.validate(data, {
          abortEarly: false,
        })
        api.post('/users', data)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Authentication error',
          description: 'Error creatung account',
        })
      }
    },
    [addToast]
  )
  const { user, updateUser } = useAuth()
  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData()
        data.append('avatar', e.target.files[0])
        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data)
          addToast({
            type: 'success',
            title: 'Succesfully updated avatar',
            description: 'Your avatar was updated successfully',
          })
        })
      }
    },
    [addToast, updateUser]
  )

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <AnimationContainer>
          <Form
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={() => {}}
            ref={formRef}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>
            <h1>My Profile </h1>

            <Input icon={FiUser} name="name" placeholder="Name" type="text" />

            <Input
              icon={FiMail}
              name="email"
              placeholder="E-mail"
              type="email"
            />
            <Input
              containerStyle={{ marginTop: 24 }}
              icon={FiLock}
              name="old_password"
              placeholder="Current pasword"
              type="password"
            />
            <Input
              icon={FiLock}
              name="password"
              placeholder="New password"
              type="password"
            />

            <Input
              icon={FiLock}
              name="password-confirmation"
              placeholder="Password confirmation"
              type="password"
            />

            <Button type="submit">Save Changes</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default Profile
