import React from 'react';
import './Event.css';

const Event = ({event}) => {
  let gridColumn = `${event.startDate}/${event.startDate + event.eventLength}`;

  return <div className="event" style={{gridColumn}}>{event.title}</div>
};

export default Event;