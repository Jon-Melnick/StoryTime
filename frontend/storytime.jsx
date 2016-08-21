const React = require('react'),
      ReactDOM = require('react-dom'),
      Login = require('./components/login'),
      Dashboard = require('./components/dashboard/dash');

import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import store from "./store"
import Story from './components/story/view'
import Signup from './components/signup'
import setAuthorizationToken from './utils/setAuthorizationToken'
import { getCurrentUser } from './actions/userActions'

import routes from './routes'

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(getCurrentUser(localStorage.jwtToken))
}

document.addEventListener('DOMContentLoaded', ()=> {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('content')
  )
})
