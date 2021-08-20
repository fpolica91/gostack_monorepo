import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import logo from '../../components/assets/logo.svg'
// import logo from '../../assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/toast'
import getValidationErrors from '../../utils/getValidationErrors'

interface SignInFormData {
    email: string
    password: string
}

const Sigin: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { signIn, user } = useAuth()
    const { addToast } = useToast()
    console.log(user)
    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            formRef.current?.setErrors({})
            try {
                const schema = Yup.object().shape({
                    email: Yup.string().email().required('email is required'),
                    password: Yup.string().required('password required'),
                })
                await schema.validate(data, {
                    abortEarly: false,
                })
                signIn({
                    email: data.email,
                    password: data.password,
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
                    description: 'Error logging in',
                })
            }
        },
        [addToast, signIn]
    )

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber" />
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Login</h1>
                        <Input
                            icon={FiMail}
                            name="email"
                            placeholder="email"
                            type="email"
                        />
                        <Input
                            icon={FiLock}
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                        <Button type="submit">Submit</Button>
                        <Link to="/forgot">Forgot Password</Link>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
            Create Account
          </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}

export default Sigin
