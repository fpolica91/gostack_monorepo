import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthLayout from '../pages/layouts/auth/index'
import DefaultLayout from '../pages/layouts/_default/index'
import { store } from '~/store'

export default function RouterWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth
  const Layout = signed ? DefaultLayout : AuthLayout

  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }
  if (signed && !isPrivate) {
    return <Redirect to="/orders" />
  }
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
  //   return <Route {...rest} component={Component} />
}

RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}
