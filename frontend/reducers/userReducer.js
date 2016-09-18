import { SET_CURRENT_USER,
         FETCH_USER_FULFILLED,
         FETCH_USER,
         SET_USER_NAME,
         SET_USER_AGE,
         ADD_FRIEND,
         UPDATE_FRIENDS,
         CLEAR } from '../actions/types'
import findIndex from 'lodash/findIndex'

const initialState={
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

export default function reducer(state=initialState, action) {

    switch (action.type) {
      case FETCH_USER: {
        return {...state, fetching: true}
      }
      case SET_CURRENT_USER:{
        return {
          user: action.user,
          friendships: action.friendships
        }
      }
      case UPDATE_FRIENDS:{
        let id = findIndex(state.friendships.pending, {id: action.friend.id})
        return {
          ...state,
          friendships: {
            friends: [
              ...state.friendships.friends,
              action.friendship
            ],
            pending: [
              ...state.friendships.pending.slice(0, id),
              ...state.friendships.pending.slice(id+1)
            ]
          }
        }
      }
      case ADD_FRIEND:{
        return {
          ...state,
          friendships: {
            ...state.friendships,
            friends: [
              ...state.friendships.friends,
              action.friend
            ]
          }
        }
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case FETCH_USER_FULFILLED: {
        return {
          ...state,
          fetching: false,
          fethed: true,
          user: action.payload,
        }
      }
      case SET_USER_NAME: {
        return {
          ...state,
          user: {...state.user, name: action.payload}
        }
      }
      case SET_USER_AGE: {
        return {
          ...state,
          user: {...state.user, age: action.payload}
        }
      }
      case CLEAR:{
        return{
          ...initialState
        }
      }
  }
  return state
}
