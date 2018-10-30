import React from 'react';
import './Event.css';

const Event = ({event}) => (
  <div className="event">{event.isFirstDay && event.title}</div>
);

export default Event;