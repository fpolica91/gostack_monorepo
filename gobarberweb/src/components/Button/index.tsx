import React, { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'
/**
 * @type is used when you are not modifing the property
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container {...rest} type="submit">
    {loading ? 'Loading...' : children}
  </Container>
)

export default Button
