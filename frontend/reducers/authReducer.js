import { SET_CURRENT_USER, CLEAR } from '../actions/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:{
      return {
        isAuthenticated: !isEmpty(action.auth),
        user: action.auth
      }
    }
    case CLEAR:{
      return{
        ...initialState
      }
    }
  }
  return state;
}
