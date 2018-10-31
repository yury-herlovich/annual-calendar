import React from 'react';
import './Event.css';

const Event = ({event, handleEventClick}) => {
  let gridColumn = `${event.startDate}/${event.startDate + event.eventLength}`;

  return (
    <div
      className="event"
      style={{gridColumn, gridRow: event.rowPosition}}
      onClick={(e) => handleEventClick(e, [event.id])}>
      {event.title}
    </div>
  )
};

export default Event;