import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import Signup from './components/signup'
import Login from './components/login'
import Story from './components/story/view'
import NewStory from './components/newStory/newStory'
import Dash from './components/dashboard/dash'

export default (
  <Route path="/" component={App}>
    <Route path="story/:storyId" component={Story} onEnter={ _redirectIfNotAllowed }/>
    <Route path="signup" component={Signup} />
    <Route path="login" component={Login} />
    <Route path="newStory" component={NewStory} />
    <Route path="dashboard/:userId" component={Dash} onEnter={ _ensureLoggedIn }/>
  </Route>
)

function _ensureLoggedIn(nextState, replace) {
  if (!localStorage.jwtToken) {
        replace('/login');
      }
}

function _redirectIfNotAllowed(nextState, replace) {
  // if (currentUser.id) {
  //       replace('/dashboard/' + currentUser.id);
  //     }
}
