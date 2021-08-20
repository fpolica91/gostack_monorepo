import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import logo from '../../components/assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'
import api from '../../services/api'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../context/toast'
import getValidationErrors from '../../utils/getValidationErrors'

interface ForgotPasswordData {
  email: string
}

const ForgotPassoword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const handleSubmit = useCallback(
    async (data: ForgotPasswordData) => {
      formRef.current?.setErrors({})
      try {
        setLoading(true)
        const schema = Yup.object().shape({
          email: Yup.string().email().required('email is required'),
        })
        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/password/forgot', {
          email: data.email
        })

        addToast({
          type: 'success',
          title: 'recovery email sent',
          description: 'check your inbox for steps on recovering your password'
        })

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Authentication error',
          description: 'Error recovering password',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="goBarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Forgot Password</h1>
            <Input
              icon={FiMail}
              name="email"
              placeholder="email"
              type="email"
            />
            <Button loading={loading} type="submit">Recover Password</Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassoword
