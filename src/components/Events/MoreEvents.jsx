import React from 'react';
import './MoreEvents.css';

const MoreEvents = ({eventsIds, eventDate, rowPosition, handleEventClick}) => {
  return (
    <div
      className="events-more"
      style={{gridColumn: eventDate, gridRow: rowPosition}}
      onClick={(e) => handleEventClick(e, eventsIds)}>
      {eventsIds.length} more
    </div>
  )
};

export default MoreEvents;