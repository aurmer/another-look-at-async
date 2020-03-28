import React from 'react'
import { connect } from 'react-redux'
import {
  openEventDialog,
  onHideModal,
  saveEvent,
  updateEventStatus,
  initSequence
} from './redux/actions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { CSSTransition } from 'react-transition-group'
import { STARTED, COMPLETED } from './constants'
import { gridIdxToCoord } from './utilFunctions'

function updateEventStat (status,props,evt) {
  if(status === COMPLETED && evt.propertyName === "width")
    props.updateEventStatus(status,evt._dispatchInstances.key)
  if(status === STARTED)
    props.updateEventStatus(status,evt._dispatchInstances.key)
}

function gridDivs(props) {
  return props.events.map((evt,idx)=> {
    const {y, x} = gridIdxToCoord(idx)
    const onClickCallback = (evt.get('isClickable')) ? props.openEventDialog.bind(null,idx) : null
    const classNames = (evt.get('isClickable')) ? "event enabled" : "event"
    const eventInfo = (evt.get('type') !== null) ? `${evt.get('type')},${(evt.get('willSucceed')) ? "t" : "f"},${evt.get('time')}s` : null
    const addEventSign = (evt.get('type') === null && evt.get('isClickable')) ? "+" : null
    const hasBeenStarted = (evt.get('status') === STARTED || evt.get('status') === COMPLETED)
    const transitionStyle = {transition: `width ${evt.get('time')}s linear`}
    const progressClassNames = (evt.get('willSucceed')) ? "progress-bar pass" : "progress-bar fail"

    /*add a tooltip which points to the left and right of each event and explains what is happening with vocab
      and there is a color wipe on the div left to right like a progress bar*/
    return (

      <div key={idx} onClick={onClickCallback} className={classNames} onTransitionEnd={updateEventStat.bind(null,COMPLETED,props)} >
      <CSSTransition
        in={hasBeenStarted}
        className={progressClassNames}
        timeout={100}
      >
        <div className="test" style={transitionStyle}></div>
      </CSSTransition>
        <div className="add-event">
          {addEventSign}
        </div>
        <div className="event-info">
          {eventInfo}
        </div>
        <div className="coord-box">
          [{y},{x}]
        </div>
      </div>
    )
  })
}

function saveFnc (props) {
  const evtType = document.getElementById('eventTypeSelect').value
  const evtSuccess = document.getElementById('eventSucceedSelect').value
  const evtTime = document.getElementById('eventTimeInput').value

  props.saveEvent(evtType,evtSuccess,evtTime)
}

function App(props) {
  const {y, x} = gridIdxToCoord(props.selectedEvent)
  const currentlySelectedEvent = (props.selectedEvent !== null) ? props.events.get(props.selectedEvent) : null
  const selectedEventType = (currentlySelectedEvent) ? currentlySelectedEvent.get('type') : ""
  const selectedEventSucceed = (currentlySelectedEvent) ? currentlySelectedEvent.get('willSucceed') : ""
  const selectedEventTime = (currentlySelectedEvent) ? currentlySelectedEvent.get('time') : ""
  const logs = props.logText.split('|newline|').map((element,idx)=>[element,React.createElement('br',{key:idx})]).flat()

  return (
    <>
      <h1>Async Events Visualizer</h1>
      <h2>(eventually game?)</h2>
      <p key={1}>
        This version doesn't have everything implemented, but it gives you a
        sense of the direction I am headed in. Stick with making 'ajax' events
        that will either pass or fail and will take X seconds to complete.
      </p>
      <p key={2}>
        X axis is memory. Y axis is time. Let me know what you think!
      </p>
      <div className="event-grid">
        {gridDivs(props)}
      </div>
      <button className="start" onClick={props.initSequence}>Start</button>
      <p className="faux-console-desc">Here is the console which will log the events</p>
      <div className="faux-console">{logs}</div>
      <Modal
        show={props.showModal}
        onHide={props.onHideModal}
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
          <Alert variant={'primary'} show={props.showEventValidationAlert}>Every field is required.</Alert>
          <p>
            Type of Event:
            <select className="event-input" id="eventTypeSelect" defaultValue={selectedEventType}>
              <option value=""></option>
              <option value="ajax">ajax</option>
              <option value="catch">catch</option>
            </select>
            Will it succeed?
            <select className="event-input" id="eventSucceedSelect" defaultValue={selectedEventSucceed}>
              <option value=""></option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </p>
          <p>
            How long will it take?
            <input className="event-input" id="eventTimeInput" placeholder="Integer in seconds" defaultValue={selectedEventTime}></input>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>saveFnc(props)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


function mapStateToProps(state) {
  return {
    showModal: state.get('editEventDialog').get('isOpen'),
    selectedEvent: state.get('selectedEvent'),
    events: state.get('events'),
    myTest: state.get('myTest'),
    showEventValidationAlert: state.get('editEventDialog').get('formIsInvalid'),
    logText: state.get('logText')
  }
}


export default connect(
  mapStateToProps,
  {
    openEventDialog,
    onHideModal,
    saveEvent,
    updateEventStatus,
    initSequence
  }
)(App)
