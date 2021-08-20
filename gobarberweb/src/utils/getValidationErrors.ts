import { ValidationError } from 'yup'

interface Errors {
  /**
   * @key is used to avoid what you see below:
   * @name: @string
   * @email : @string
   * our form only has 3 fields, but a form with many fields this
   * @interface would be very larget -> @dynamic
   */
  [key: string]: string
}

export default function getValidationErrors(err: ValidationError): Errors {
  const ValidationErrors: Errors = {}
  err.inner.forEach((error) => {
    ValidationErrors[error.path] = error.message
  })

  return ValidationErrors
}
