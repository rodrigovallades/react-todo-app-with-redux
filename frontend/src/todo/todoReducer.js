const INITIAL_STATE = {
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
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'DESCRIPTION_CHANGED':
      return { ...state, description: action.payload }
    default:
      return state
  }
}
