
const defaultOpts={
    genres: [],
    genre: [],
  }

export default function reducer(state=defaultOpts, action) {

    switch (action.type) {
      case "FETCH_GENRES": {
        return {
          genres: {...action.data},
          genre: {...state.genre}
        }
      }
      case "FETCH_WORDS":{
        return {
          ...state,
          genre: {...action.data}
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
