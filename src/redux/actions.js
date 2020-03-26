import {
  OPEN_EVENT_DIALOG,
  CLOSE_EVENT_DIALOG
} from './actionTypes'

export const openEventDialog = (id) => ({
  type: OPEN_EVENT_DIALOG,
  payload: {id: id}
})

export const onHideModal = () => ({
  type: CLOSE_EVENT_DIALOG,
  payload: {}
})
