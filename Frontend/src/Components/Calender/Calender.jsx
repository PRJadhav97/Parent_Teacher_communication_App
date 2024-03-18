import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import core from '@fullcalendar/core';
import momentPlugin from '@fullcalendar/moment';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import './Calender.css';

function Calender() {
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);

  // State for the add event modal
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [color, setColor] = useState('#3788d8');
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (moment(endDate) <= moment(startDate)) {
      setShowDangerAlert(true);
      return;
    }

    const newEvent = {
      id: uuidv4(),
      title: title,
      start: startDate,
      end: moment(endDate).add(1, 'day').format('YYYY-MM-DD'),
      backgroundColor: color
    };

    setEvents([...events, newEvent]);
    localStorage.setItem('events', JSON.stringify([...events, newEvent]));

    setShowModal(false);
    setTitle('');
    setStartDate('');
    setEndDate('');
    setColor('#3788d8');
    setShowDangerAlert(false);
  };

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, momentPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => console.log(info.event.title)}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {showDangerAlert && <div className="alert alert-danger" role="alert">End date should be greater than start date.</div>}
            <div className="form-group">
              <label htmlFor="event-title">Event name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" id="event-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter event name" required />
            </div>
            <div className="form-group">
              <label htmlFor="start-date">Start date <span className="text-danger">*</span></label>
              <input type="date" className="form-control" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="end-date">End date - <small className="text-muted">Optional</small></label>
              <input type="date" className="form-control" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="event-color">Color</label>
              <input type="color" className="form-control" id="event-color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-success">Submit</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Calender;
