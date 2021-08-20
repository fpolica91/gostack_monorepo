import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthLayout from '~/pages/_layouts/auth/index'
import DefaultLayout from '~/pages/_layouts/default/index'
import { store } from '~/store'
export default function RouteWrapper({
  // THE COMPONENT WE ARE RENDERING
  component: Component,
  // IF IT IS A PRIVATE ROUTE OR NOT
  isPrivate = false,
  // ANY OTHER PROPERTY
  ...rest
}) {
  const { signed } = store.getState().auth
  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
  isPrivate: false
}
