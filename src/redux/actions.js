import {
  OPEN_EVENT_DIA,
  CLOSE_EVENT_DIA
} from './actionTypes'

export const openEventDialog = (id) => ({
  type: OPEN_EVENT_DIA,
  payload: {id: id}
})

export const onHideModal = () => ({
  type: CLOSE_EVENT_DIA,
  payload: {}
})
