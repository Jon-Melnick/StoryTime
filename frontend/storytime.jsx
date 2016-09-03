import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { getCurrentUser } from './actions/userActions'
import setAuthorizationToken from './utils/setAuthorizationToken'
import store from "./store"
import routes from './routes'

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(getCurrentUser(localStorage.jwtToken));
}

document.addEventListener('DOMContentLoaded', ()=> {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('content')
  )
})
