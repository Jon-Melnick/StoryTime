import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'

import { SET_CURRENT_USER } from './types'



export function userSignupRequest(userData) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.post('api/users', {user: userData}).then(res =>{
      const token = res.data.session_token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(res.data));
    })
  }
}

export function userExist(data) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.get(`api/users`, {params: data})
  }
}

export function setCurrentUser(user) {
  console.log('hi');
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function getCurrentUser(token) {
  const params = {params: {session_token: token}}
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=> {
    return axios.get(`api/users`, params).then(res => {
      setAuthorizationToken(res.data.session_token);
      dispatch(setCurrentUser(res.data));
    })
  }
}

export function userLoginRequest(data) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.post(`api/session`, data).then(
      (res) => {
        const token = res.data.session_token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(res.data));
      }
    )
  }
}

export function logout() {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.delete('api/session').then(()=>{
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(clearStores());
    })
  }
}

export function clearStores() {
  return {
    type: "CLEAR"
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

function getCSRF(){
  const header = document.querySelector(`meta[name="csrf-token"]`);
  return header && header.content;
}
