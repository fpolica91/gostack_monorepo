import React from 'react'
import { Switch } from 'react-router-dom'
import Singup from '../pages/Singup/index'
import Sigin from '../pages/Signin/index'
import Router from './Routes'
import Dashboard from '../pages/Dashboard'
import ForgotPassoword from '../pages/ForgotPassword/index'
import ResetPassword from '../pages/ResetPassword/index'
import Profile from '../pages/Profile'

const Routes: React.FC = () => (
  <Switch>
    <Router exact path="/" component={Sigin} />
    <Router path="/signup" component={Singup} />
    <Router path="/forgot" component={ForgotPassoword} />
    <Router path="/reset" component={ResetPassword} />
    <Router path="/dashboard" component={Dashboard} isPrivate />
    <Router path="/profile" component={Profile} isPrivate />
  </Switch>
)

export default Routes
