import axios from 'axios';

import { FETCH_GENRES, FETCH_WORDS, CLEAR } from './types'


export function getGenres() {
  return dispatch => {
    return axios.get(`api/genres`).then(res => {
      dispatch(setGenres(res.data))
    })
  }
}

export function getWords(id) {
  return dispatch=>{
    return axios.get(`api/genres/${id}`).then(
      res=>dispatch(setWords(res.data))
    )
  }
}

export function addWord(id, word) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=>{
    return axios.post('api/words', {word: {genre_id: id, word: word}}).then(
      res=>dispatch(setWords(res.data))
    )
  }
}

export function setGenres(data) {
  return {
    type: FETCH_GENRES,
    data
  }
}

export function setWords(data) {
  return {
    type: FETCH_WORDS,
    data
  }
}

function getCSRF(){
  const header = document.querySelector(`meta[name="csrf-token"]`);
  return header && header.content;
}
