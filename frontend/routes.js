import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import Signup from './components/signup'
import Login from './components/login'
import Story from './components/story/view'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Story} />
    <Route path="signup" component={Signup} />
    <Route path="login" component={Login} />
  </Route>
)
