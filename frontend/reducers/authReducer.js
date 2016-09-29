import { SET_CURRENT_USER, CLEAR, FETCHING, FETCHED } from '../actions/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
  isAuthenticated: false,
  fetching: false,
  fetched: false,
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHING: {
      return {
        ...this.state,
        fetching: true
      }
    }
    case FETCHED: {
      return {
        ...this.state,
        fetching: false,
        fetched: true
      }
    }
    case SET_CURRENT_USER:{
      return {
        isAuthenticated: !isEmpty(action.auth),
        fetching: false,
        fetched: true,
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
