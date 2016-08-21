import { combineReducers } from 'redux'

import user from "./userReducer"
import story from "./storyReducer"
import auth from "./authReducer"
import genres from "./genreReducer"

export default combineReducers({
  user,
  story,
  auth,
  genres
})
