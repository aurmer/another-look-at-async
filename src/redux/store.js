import { createStore } from 'redux'
import { ADD_ELEMENT } from './actionTypes'
import { TODO_HERE } from './../constants'
import { createUUID } from './../utilFunctions'

const initialState = {

}

function deepCopy (oldObject) {
  return JSON.parse(JSON.stringify(oldObject))
}


function reducer (state = initialState, action) {
  let newState = deepCopy(state)

  switch (action.type) {
    case ADD_ELEMENT: {
      break
    }
    default: {

    }
  }
  return newState
}

export default createStore(reducer)
