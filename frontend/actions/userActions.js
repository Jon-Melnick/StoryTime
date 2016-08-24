import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'

import { SET_CURRENT_USER } from './types'



export function userSignupRequest(userData) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.post('api/users', {user: userData}).then(res =>{
      const token = res.data.auth.session_token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(res.data));
    })
  }
}

export function sendRequest(id) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=>{
    return axios.post(`api/friendships`, {friendship: {receiver_id: id}}).then(
      res=>dispatch(addFriend(res.data)),
      err=>console.log(err.response)
    )
  }
}

export function acceptRequest(id) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=>{
    return axios.patch('api/friendships/' + id).then(
      (res)=>dispatch(updateFriends(res.data))
    )
  }
}

export function updateFriends(data) {
  return{
    type: "UPDATE_FRIENDS",
    friend: data.friend
  }
}

export function addFriend(data) {
  return{
    type: "ADD_FRIEND",
    friend: data.friend
  }
}

export function userExist(data) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.get(`api/users`, {params: data})
  }
}

export function setCurrentUser(data) {
  return {
    type: SET_CURRENT_USER,
    auth: data.auth,
    friendships: data.friendships,
    user: data.user
  }
}

export function getCurrentUser(token) {
  const params = {params: {session_token: token}}
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=> {
    return axios.get(`api/users`, params).then(res => {
      setAuthorizationToken(res.data.auth.session_token);
      dispatch(setCurrentUser(res.data))
    })
  }
}

export function userLoginRequest(data) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.post(`api/session`, data).then(
      (res) => {
        const token = res.data.auth.session_token;
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

export function getAuthors(data) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=> {
    return axios.get('api/users', {params: data})
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
