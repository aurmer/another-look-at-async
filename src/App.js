import React from 'react'
import { connect } from 'react-redux'
import {
  openEventDialog,
  onHideModal
} from './redux/actions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { SELECTED_EVENT_COLOR } from './constants'

function gridIdxToCoord(idx) {
  return {
    y: Math.floor(idx/6),
    x: idx%6
  }
}

function gridDivs(props) {
  return props.eventsArray.map((evt,idx)=> {
    const {y, x} = gridIdxToCoord(idx)
    const onClickCallback = (evt.get('clickable')) ? props.openEventDialog.bind(null,idx) : null
    const styles = (evt.get('clickable')) ? {backgroundColor:SELECTED_EVENT_COLOR} : {}

    /*add a tooltip which points to the left and right of each event and explains what is happening with vocab*/
    return (

      <div key={idx} onClick={onClickCallback} style={styles}>
        {evt.get('type')}
        <div className="coord-box">
          [{y},{x}]
        </div>
      </div>
    )
  })
}

function App(props) {
  const {y, x} = gridIdxToCoord(props.selectedEvent)

  return (
    <>
      <div className="event-grid">
        {gridDivs(props)}
      </div>
      <Modal
        show={props.showModal}
        onHide={props.onHideModal}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create/Edit Event [{y}][{x}]
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select id="eventTypeSelect">
            <option value=""></option>
            <option value="clock">clock</option>
            <option value="ajax">ajax</option>
            <option value="ajax"></option>
          </select>
          <select id="eventSucceedSelect">
            <option value=""></option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHideModal}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


function mapStateToProps(state) {
  return {
    showModal: state.get('eventDialogOpen'),
    selectedEvent: state.get('selectedEvent'),
    eventsArray: state.get('events')
  }
}


export default connect(
  mapStateToProps,
  {
    openEventDialog,
    onHideModal
  }
)(App)
