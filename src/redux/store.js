import { createStore } from 'redux'
import {
  OPEN_EVENT_DIALOG,
  CLOSE_EVENT_DIALOG
} from './actionTypes'
import { TODO_HERE } from './../constants'
import { createUUID } from './../utilFunctions'
import { Map } from 'immutable'

const initialState = Map({
  eventDialogOpen: false,
  selectedEvent: null,
  events: null
})

function reducer (state = initialState, action) {
  console.log('ran reducer')

  switch (action.type) {
    case OPEN_EVENT_DIALOG: {
      return state.update('eventDialogOpen', () => true)
                  .update('selectedEvent', () => action.payload.id)
      break
    }
    case CLOSE_EVENT_DIALOG: {
      return state.update('eventDialogOpen', () => false)
                  .update('selectedEvent', () => null)
      break
    }
    default: {
      return state
    }
  }
}

export default createStore(reducer)
