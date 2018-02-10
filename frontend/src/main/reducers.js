import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  todo: () => ({
    description: 'Read book',
    list: [{
      _id: 1,
      description: 'Pay card',
      done: true
    }, {
      _id: 2,
      description: 'Aew',
      done: false
    }, {
      _id: 3,
      description: 'Medic',
      done: true
    }]
  })
})

export default rootReducer
