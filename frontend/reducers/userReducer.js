import { SET_CURRENT_USER } from '../actions/types'

const defaultOpts={
    user: {
      id: null,
      name: null,
    },
    friendships:{
      friends: null,
      pendings: null,
    },
    users: {},
    fetching: false,
    fetched: false,
    error: null,
  }

export default function reducer(state=defaultOpts, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case SET_CURRENT_USER:{
        return {
          user: action.user,
          friendships: action.friendships
        }
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fethed: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload}
        }
      }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload}
        }
      }
      case "CLEAR":{
        return{
          ...defaultOpts
        }
      }
  }
  return state
}
