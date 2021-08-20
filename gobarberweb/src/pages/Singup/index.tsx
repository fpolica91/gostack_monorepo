import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import logo from '../../components/assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import * as Yup from 'yup'
import api from '../../services/api'
import { useToast } from '../../context/toast'
import getValidationErrors from '../../utils/getValidationErrors'

const Singup: React.FC = () => {
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

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber" />
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Sign Up </h1>
                        <Input
                            icon={FiUser}
                            name="name"
                            placeholder="email"
                            type="name"
                        />
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
                        <Button type="submit">Register</Button>
                    </Form>
                    <Link to="/">
                        <FiArrowLeft />
                        Login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default Singup
