import React from 'react';
import './EventsRow.css';

import Event from './Event';

const EventsRow = ({events, handleEventClick}) => (
  <div className="events-row">
    { events.map(event => (
      <Event event={event} key={event.id} handleEventClick={handleEventClick} />
    ))}
  </div>
);

export default EventsRow;