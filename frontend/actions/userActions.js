import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'

import { SET_CURRENT_USER } from './types'

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('api/users', {user: userData})
  }
}

export function userExist(data) {
  console.log(data.email);
  return dispatch => {
    return axios.get(`api/users`, data)
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function getCurrentUser(token) {
  console.log(token);
  const params = {params: {session_token: token}}
  return dispatch=> {
    return axios.get(`api/users`, params).then(res => {
      setAuthorizationToken(res.data.session_token);
      dispatch(setCurrentUser(res.data));
    })
  }
}

export function userLoginRequest(data) {
  return dispatch => {
    return axios.post(`api/session`, data).then(res => {
      const token = res.data.session_token;
      console.log(res);
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(res.data));
    })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}


export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Will",
      age: 35,
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}
