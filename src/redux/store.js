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
  events: [...Array(24)].map((element,idx)=>buildInitialEvent(idx))
})

function buildInitialEvent(idx) {
  const eventDetails = Map({
    clickable: false,
    trigger: null,
    data: null,
    time: null,
    willSucceed: true
  })
  if(idx === 0) {
    return eventDetails.update('clickable',()=>true)
  }
  return eventDetails
}

function updateClickableEvents(events) {
  //use the trigger property of each event to determine if it has been set
  return events.map( (evnt,idx) => {
    const isSet = evnt.get('trigger')
    const isFirstRow = idx < 6
    const hasSetEventAbove = (isFirstRow) ? false : events[idx-6].get('trigger') !== null
    const canRunParallel = (idx === 0) ? true : events[idx-1].get('trigger') !== null

    if(isSet || hasSetEventAbove || canRunParallel) {
      return evnt.update('clickable',()=>true)
    }
    return evnt.update('clickable',()=>false)
  })
}


function reducer (state = initialState, action) {

  switch (action.type) {
    case OPEN_EVENT_DIALOG: {
      return state.update('eventDialogOpen', () => true)
                  .update('selectedEvent', () => action.payload.id)
    }
    case CLOSE_EVENT_DIALOG: {
      return state.update('eventDialogOpen', () => false)
    }
    default: {
      return state
    }
  }
}

export default createStore(reducer)
