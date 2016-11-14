import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import Signup from './components/signup'
import Login from './components/login'
import Story from './components/story/view'
import NewStory from './components/newStory/newStory'
import Dash from './components/dashboard/dash'
import Genre from './components/genres/genre'
import Authors from './components/authors/authors'
import Home from './components/home'

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}/>
    <Route path="story/:storyId" component={Story}/>
    <Route path="signup" component={Signup} />
    <Route path="login" component={Login} />
    <Route path="authors" component={Authors} />
      <Route path="newStory" component={NewStory} />
    <Route path="genre" component={Genre} >
      <Route path="/:genId" component={Genre} />
    </Route>
    <Route path="dashboard/:userId" component={Dash} onEnter={ _ensureLoggedIn }/>
    <Route path='*' component={NotFound} />
  </Route>
)

export function holder(){
  onEnter={ _ensureLoggedIn }
}

export function _ensureLoggedIn(nextState, replace) {
  if (!localStorage.jwtToken) {
        replace('/login');
      }
}
