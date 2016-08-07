import { combineReducers } from 'redux'

import user from "./userReducer"
import story from "./storyReducer"
import auth from "./authReducer"

export default combineReducers({
  user,
  story,
  auth,
})
