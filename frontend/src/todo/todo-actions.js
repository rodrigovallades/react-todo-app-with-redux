import axios from 'axios'

const API_URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
})

export const search = (description) => {
  return (dispatch, getState) => {
    const description = getState().todo.description
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${API_URL}?sort=-createdAt${search}`)
      .then(res => dispatch({ type: 'TODO_SEARCHED', payload: res.data }))
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
      .then(res => dispatch( clear() ))
      .then(res => dispatch( search() ))
  }
}

export const markAsDone = (todo) => {
  return dispatch => {
    axios.put(`${API_URL}/${todo._id}`, { done: true })
      .then(res => dispatch({ type: 'TODO_DONE', payload: res.data }))
      .then(res => dispatch(search()))
  }
}

export const markAsPending = (todo) => {
  return dispatch => {
    axios.put(`${API_URL}/${todo._id}`, { done: false })
      .then(res => dispatch({ type: 'TODO_PENDING', payload: res.data }))
      .then(res => dispatch(search()))
  }
}

export const remove = (todo) => {
    return dispatch => {
      axios.delete(`${API_URL}/${todo._id}`)
      .then(res => dispatch({ type: 'TODO_REMOVED', payload: res.data }))
      .then(res => dispatch(search()))
    }
}

export const clear = () => {
  return [{ type: 'TODO_CLEAR' }, search()]
}
