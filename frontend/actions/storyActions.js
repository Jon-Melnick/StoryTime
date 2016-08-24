import axios from 'axios';


export function getAllStoriesBy(data){
  return dispatch => {
    const getStories = {getStoriesBy: data}
    return axios.get('api/stories', {params: getStories}).then(res => {
      dispatch(setYourStories(res.data))
    })
  }
}

export function setYourStories(data) {
  return {
    type: "FETCH_STORIES",
    data
  }
}

export function getStory(storyId) {
  return dispatch => {
    return axios.get(`api/stories/${storyId}`).then(res => {
      dispatch(setStory(res.data))
    })
  }
}

export function sendAuthorInvite(storyId, userId) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=>{
    return axios.post('api/writers', {story_id: storyId, user_id: userId}).then((res)=>{
      dispatch(setNewAuthor(res.data))
    })
  }
}

export function setStory(data) {
  return {
    type: "FETCH_STORY",
    data
  }
}

export function setNewAuthor(data) {
  return {
    type: "NEW_AUTHOR",
    author: data
  }
}

export function removeStory() {
  return {
    type: "REMOVE_STORY"
  }
}



export function createStory(data) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.post('api/stories', data).then(res => {
      dispatch(setStory(res.data));
      dispatch(updateStories(res.data));
    })
  }
}

export function createSection(data) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.post('api/sections', data).then(res => {
      dispatch(addSection(res.data));
    })
  }
}

export function addSection(data) {
  return {
    type: "UPDATE_STORY_SECTIONS",
    data
  }
}

export function updateStories(data) {
  return {
    type: "UPDATE_STORIES",
    data
  }
}

export function getGenres() {
  return dispatch => {
    return axios.get('api/genres').then(res =>{
      dispatch(setGenres(res.data))
    })
  }
}

export function setGenres(data) {
  return {
    type: "FETCH_GENRE",
    data
  }
}


export function setCurrentSection(data) {
  return {
    type: "SET_CURRENT_SECTION",
    data
  }
}

export function getNewCards(id, cards) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch => {
    return axios.patch('api/writers/' + id, {cards: cards}).then(
      res=>{
        dispatch(setStory(res.data));
        dispatch(updateStories(res.data));
      })
  }
}

export function markSeen(userId, sectionId) {
  axios.defaults.headers.common['x-csrf-token'] = getCSRF();
  return dispatch=>{
    return axios.patch('api/sections/' + sectionId).then(
      res=>dispatch(newSeen(res.data))
    )
  }
}

export function newSeen(data) {
  return {
    type: "NEW_SEEN",
    data
  }
}

function getCSRF(){
  const header = document.querySelector(`meta[name="csrf-token"]`);
  return header && header.content;
}
