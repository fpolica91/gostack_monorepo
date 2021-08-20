import React, { useCallback, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import logo from '../../components/assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../context/toast'
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors'

interface ForgotPasswordProps {
  password: string;
  token: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const handleSubmit = useCallback(
    async (data: ForgotPasswordProps) => {
      formRef.current?.setErrors({})
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('password required'),
        })
        await schema.validate(data, {
          abortEarly: false,
        })
        // 6d9532ad-09a7-43c1-ad73-060bd0188459

        const token = location.search.replace('?token=', '')
        if (!token) {
          addToast({
            title: 'Error',
            type: "error",
            description: 'Error resetting your password'
          })
        }

        await api.post('/password/reset', {
          password: data.password,
          token
        })
        addToast({
          type: 'success',
          title: 'Password reset'
        })
        history.push('/...')

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Authentication error',
          description: 'Error occurred when resetting password',
        })
      }
    },
    [addToast, history, location.search]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="goBarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Reset Password</h1>
            <Input
              icon={FiLock}
              name="password"
              placeholder="password"
              type="password"
            />
            <Button type="submit">Reset Password</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
