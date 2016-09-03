import { FETCH_GENRES, FETCH_WORDS, CLEAR } from '../actions/types'


const initialState={
    genres: [],
    genre: [],
  }

export default function reducer(state=initialState, action) {

    switch (action.type) {
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
