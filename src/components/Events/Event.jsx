import React from 'react';
import './Event.css';

const Event = ({event}) => {
  let gridColumn = `${event.startDate}/${event.startDate + event.eventLength}`;

  return <div className="event" style={{gridColumn, gridRow: event.rowPosition}}>{event.title}</div>
};

export default Event;