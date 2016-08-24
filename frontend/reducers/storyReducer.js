const defaultOpts = {
    stories: {},
    story: {
      fetched: false,
      id: null,
      title: null,
      currentSection: null,
      description: null,
      genre: null,
      sections: []
    },
    genres: {
      fetched: false,
      gens: null
    },
    fetching: false,
    fetched: false,
    error: null,
  }

export default function reducer(state=defaultOpts, action) {

    switch (action.type) {
      case "FETCH_STORIES": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          stories: action.data,
        }
      }
      // case "FETCH_STORY": {
      //   return {...state, fetching: true}
      // }
      case "FETCH_STORY_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_STORY": {
        return {
          ...state,
          story: {fetch: true, currentSection: action.data.sections[0] || {body: 'Start the story...'}, ...action.data},
        }
      }
      case "NEW_AUTHOR":{
        return {
          ...state,
          story: {
            ...state.story,
            authors: [
              ...state.story.authors,
              action.author
            ]
          }
        }
      }
      case "REMOVE_STORY":{
        return {
          ...state,
          story: {
            ...defaultOpts.story
          }
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
      case "SET_CURRENT_SECTION": {
        return {
          ...state,
          story: {...state.story, currentSection: action.data}
        }
      }
      case "FETCH_GENRE":{
        return{
          ...state,
          genres:{fetched: true, gens: action.data}
        }
      }
      case "UPDATE_STORIES":{
        return{
          ...state,
          stories: [...state.stories, action.data]
        }
      }
      case "UPDATE_STORY_SECTIONS":{
          return{
            ...state,
            story: {...state.story,
                    currentSection: action.data,
                    sections: [...state.story.sections, action.data]
                  }
          }
      }
      case "CLEAR":{
        return {
          ...defaultOpts
        }
      }
  }
  return state
}
