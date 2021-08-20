import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { ToastMessage, useToast } from '../../../context/toast'
import { Container } from './styles'

export interface ToastProps {
  message: ToastMessage
  style: Object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast()
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)

      return () => {
        return clearTimeout(timer)
      }
    }, 3500)
  }, [message.id, removeToast])

  return (
    <Container
      type={message.type}
      hasdecription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        <p>{message.description && message.description}</p>
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
