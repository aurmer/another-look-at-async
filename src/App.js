import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import {
  openEventDialog,
  onHideModal
} from './redux/actions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function gridDivs(props) {
  return props.eventsArray.map((evt,idx)=> {
    console.log(evt)
    const onClickCallback = (evt.get('clickable')) ? props.openEventDialog.bind(null,idx) : null
    const styles = (evt.get('clickable')) ? {backgroundColor:"#DDD"} : {backgroundColor:"grey"}
    return (
      <div key={idx} onClick={onClickCallback} style={styles}></div>
    )
  })
}

function App(props) {
  console.log(props)
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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Event #{props.selectedEvent}</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHideModal}>Close</Button>
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
