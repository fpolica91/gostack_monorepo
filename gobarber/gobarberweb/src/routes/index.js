import { Switch } from 'react-router-dom'
import React from 'react'
import Route from './Route'
import Dashboard from '~/pages/Dashboard/index'
import SignIn from '~/pages/Sigin/index'
import Signup from '~/pages/Signup/index'
import Profile from '~/pages/Profile/index'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={Signup} />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  )
}
