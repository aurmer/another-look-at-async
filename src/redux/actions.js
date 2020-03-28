import {
  OPEN_EVENT_DIALOG,
  CLOSE_EVENT_DIALOG,
  SAVE_EVENT,
  UPDATE_EVENT,
  INIT_SEQUENCE,
  RESET_STATUS
} from './actionTypes'

export const openEventDialog = (evtId) => ({
  type: OPEN_EVENT_DIALOG,
  payload: {evtId: evtId}
})

export const onHideModal = () => ({
  type: CLOSE_EVENT_DIALOG
})

export const saveEvent = (evtType,succeed,time) => ({
  type: SAVE_EVENT,
  payload: {
    evtType: evtType,
    evtSucceed: succeed,
    evtTime: time
  }
})

export const updateEventStatus = (status,id) => ({
  type: UPDATE_EVENT,
  payload: {
    id: id,
    status: status
  }
})

export const initSequence = () => ({
  type: INIT_SEQUENCE
})

export const resetStatus = () => ({
  type: RESET_STATUS
})
