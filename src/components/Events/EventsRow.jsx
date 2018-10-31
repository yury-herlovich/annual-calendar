import React from 'react';
import './EventsRow.css';

import Event from './Event';

const EventsRow = ({events}) => (
  <div className="events-row">
    { events.map(event => (
      <Event event={event} key={event.id} />
    ))}
  </div>
);

export default EventsRow;