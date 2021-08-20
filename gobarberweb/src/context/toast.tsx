import React, { createContext, useContext, useCallback, useState } from 'react'
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer'

export interface ToastMessage {
  id: string
  type?: 'success' | 'info' | 'error'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

/**
 * @ToastContext simple we create context
 * @ToatProvider we create provider here we have functions we want to execute
 * @children is passed  and it will pass  these props to any component within it
 */
const ToasContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])
  const addToast = useCallback(
    /**
     * @Omit specifies the property that is not passed to the function
     */
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid()
      const toast = {
        id,
        type,
        description,
        title,
      }
      /**
       * @state => arrow function gets previous items in state
       * @oldMessages in this  case
       */
      setMessages((state) => [...state, toast])
    },
    []
  )
  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }, [])
  return (
    <ToasContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToasContext.Provider>
  )
}

/**
 * @useToast is a function giving use access to the functions within the toastProvider
 * @const context = useContext(ToasContext) if not we would need to do this in the  file
 */

function useToast(): ToastContextData {
  const context = useContext(ToasContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export { ToastProvider, useToast }
