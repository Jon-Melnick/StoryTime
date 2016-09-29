import { FETCH_GENRES, FETCH_WORDS, CLEAR, FETCHING, FETCHED } from '../actions/types'


const initialState={
    genres: [],
    genre: [],
    fetching: false,
    fetched: false,
  }

export default function reducer(state=initialState, action) {

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
      case FETCH_GENRES: {
        return {
          genres: {...action.data},
          genre: {...state.genre}
        }
      }
      case FETCH_WORDS:{
        return {
          ...state,
          genre: {...action.data}
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
