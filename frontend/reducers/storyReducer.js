export default function reducer(state={
    story: {
      id: null,
      title: null,
      description: null,
      genre: null,
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_STORY": {
        return {...state, fetching: true}
      }
      case "FETCH_STORY_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_STORY_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fethed: true,
          story: action.payload,
        }
      }
      case "SET_STORY_TITLE": {
        return {
          ...state,
          story: {...state.story, title: action.payload}
        }
      }
      case "SET_STORY_DESCRIPTION": {
        return {
          ...state,
          story: {...state.story, description: action.payload}
      }
    }
  }
  return state
}
