import axios from 'axios'

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('hi');
    delete axios.defaults.headers.common['Authorization'];
  }
}
