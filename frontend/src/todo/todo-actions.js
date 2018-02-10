import axios from 'axios'

const API_URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
})

export const search = () => {
  const request = axios.get(`${API_URL}?sort=-createdAt`)
  return {
    type: 'TODO_SEARCHED',
    payload: request
  }
}

// pure action creator

// export const add = (description) => {
//   const request = axios.post(API_URL, { description })
//   return {
//     type: 'TODO_ADDED',
//     payload: request
//   }
// }

// action creator with 'multi' middleware

// export const add = (description) => {
//   const request = axios.post(API_URL, { description })
//   return [{
//     type: 'TODO_ADDED',
//     payload: request
//   }, search()]
// }

// action creator with 'multi' and 'thunk' middlewares

export const add = (description) => {
  return dispatch => {
    axios.post(API_URL, { description })
      .then(res => dispatch({ type: 'TODO_ADDED', payload: res.data }))
      .then(res => dispatch( search() ))
  }
}
