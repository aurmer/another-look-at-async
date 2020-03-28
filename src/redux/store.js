import { createStore } from 'redux'
import {
  OPEN_EVENT_DIALOG,
  CLOSE_EVENT_DIALOG,
  SAVE_EVENT,
  UPDATE_EVENT,
  INIT_SEQUENCE,
  RESET_STATUS,
  CLEAR_ALL
} from './actionTypes'
import { Map, List } from 'immutable'
import { UNSTARTED, STARTED, COMPLETED } from '../constants'
import { gridIdxToCoord } from '../utilFunctions'

const initialState = Map({
  editEventDialog: Map({
    isOpen: false,
    formIsInvalid: false
  }),
  logText: "",
  selectedEvent: null,
  startTimestamp: null,
  events: List(Array(24)).map((element,idx)=>buildInitialEvent(idx))
})

function buildInitialEvent(idx) {
  const eventDetails = Map({
    isClickable: false,
    type: null,
    data: null,
    time: null,
    willSucceed: null,
    status: UNSTARTED /* "UNSTARTED" "STARTED" "COMPLETE" */
  })
  if(idx === 0) {
    return eventDetails.update('isClickable',()=>true)
  }
  return eventDetails
}

function updateClickableEvents(events) {
  //use the type property of each event to determine if it has been set
  return events.map( (evt,idx) => {
    const isSet = evt.get('type')
    const isFirstRow = idx < 6
    const hasSetEventAbove = (isFirstRow) ? false : events.get(idx-6).get('type') !== null
    const canRunParallel = (idx === 0) ? true : (isFirstRow && events.get(idx-1).get('type') !== null)

    if(isSet || hasSetEventAbove || canRunParallel) {
      return evt.update('isClickable',()=>true)
    }
    return evt.update('isClickable',()=>false)
  })
}

function calculateTimeSinceStart (startTime) {
  return Math.floor((new Date().getTime() - startTime) / 1000)
}

function printLog (idx,status,startTime) {
  const { y, x } = gridIdxToCoord(idx)
  const eventDesc = (status === STARTED) ? 'started' : 'completed'
    return `> The event [${y},${x}] has ${eventDesc} at ${calculateTimeSinceStart(startTime)} seconds.|newline|`
}

function reducer (state = initialState, action) {
  const data = action.payload
  switch (action.type) {
    case OPEN_EVENT_DIALOG: {
      return state.update('editEventDialog', (dialog) => dialog.update('isOpen',()=>true))
                  .update('selectedEvent', () => data.evtId)
    }
    case CLOSE_EVENT_DIALOG: {
      return state.update('selectedEvent', ()=>null)
                  .update('editEventDialog', (dialog) => dialog.update('isOpen',()=>false)
                                                               .update('formIsInvalid',()=>false))

    }
    case SAVE_EVENT: {
      const evtTime = parseInt(data.evtTime)
      if(data.evtType !== "" && data.evtSucceed !== "" && !isNaN(evtTime)) {
        return state.update('editEventDialog', (dialog) => dialog.update('isOpen',()=>false))
                    .update('selectedEvent', ()=>null)
                    .update('events',
                            (events)=>
                              updateClickableEvents(events.update(state.get('selectedEvent'),
                                                                  (event) =>
                                                                    event.update('type',()=>data.evtType)
                                                                         .update('willSucceed',()=>(data.evtSucceed === "true") ? true : false)
                                                                         .update('time',()=>evtTime))))
      }
      //else add the warning message that the form was invalid
      return state.update('editEventDialog', (dialog) => dialog.update('formIsInvalid',()=>true))
    }
    case UPDATE_EVENT: {
      const data = action.payload
      const updatingId = parseInt(data.id)
      const nextInChain = (updatingId < 18) ? updatingId + 6 : null
      const isSet = (evtId) => (evtId !== null) ? (state.get('events').get(evtId).get('type') !== null) : false

      if (data.status === COMPLETED) {
        const updatedEventState = state.update('events',
                                          (events)=>
                                            events.update(data.id,
                                                          (event)=>
                                                            event.update('status',
                                                                         ()=>COMPLETED)))
                                       .update('logText',
                                                (text)=>text+printLog(updatingId,COMPLETED,state.get('startTimestamp')))
        if(isSet(nextInChain)) {
          return updatedEventState.update('events',
                                          (events)=>
                                            events.update(nextInChain,
                                                          (event)=>
                                                            event.update('status',
                                                                         ()=>STARTED)))
                                  .update('logText',
                                          (text)=>text+printLog(nextInChain,STARTED,state.get('startTimestamp')))}
        return updatedEventState
      } else if (data.status === STARTED) {
        return state.update('events',
                            (events)=>
                              events.update(data.id,
                                            (event)=>
                                              event.update('status',
                                                           ()=>STARTED)))
                    .update('logText',
                            (text)=>text+printLog(data.id,STARTED,state.get('startTimestamp')))}
      break
    }
    case INIT_SEQUENCE: {
      const newState = state.update('events',
                          (events)=>
                            events.map((event,idx)=> {
                                        if(idx < 6 && event.get('type') !== null) {
                                          return event.update('status',()=>STARTED)}
                                        return event}))
                  .update('startTimestamp',()=>new Date().getTime())

      return newState.update('logText',
                      (text)=>newState.get('events').map((event,idx)=> {
                                                        return (event.get('status') === STARTED) ? text+printLog(idx,STARTED,newState.get('startTimestamp')) : text}).join(''))}
    case RESET_STATUS: {
      return state.update('events',(events)=>
                                    events.map((event)=>
                                              event.update('status',()=>UNSTARTED)))
                  .update('logText',()=>"")
                  .update('startTimestamp',()=>null)
    }
    case CLEAR_ALL: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default createStore(reducer)
