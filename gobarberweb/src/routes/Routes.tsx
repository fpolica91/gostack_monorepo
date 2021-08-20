import React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export interface RouterProps extends RouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

/**
 * @route is private and @user is authenticated : OK
 * @route is not private and @user IS authenticated : go to Dashboard
 * @route is private and @user IS NOT authenticated : login
 * @route is not private and @user is not authenticated : OK
 */

const RouterWrapper: React.FC<RouterProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}

export default RouterWrapper
