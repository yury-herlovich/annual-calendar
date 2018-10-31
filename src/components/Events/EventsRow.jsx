import React from 'react';
import './EventsRow.css';

import Event from './Event';
import MoreEvents from './MoreEvents';

const showEventsCount = 2;

const EventsRow = ({events, handleEventClick}) => {
  let showedEvents = events.filter(event => event.rowPosition <= showEventsCount);
  let hidEvents = events.filter(event => event.rowPosition > showEventsCount);

  // { date: [ids]}
  let hidEventsByDates = {};
  hidEvents.forEach(event => {
    for(let i = 0; i < event.eventLength; i++) {
      if (hidEventsByDates[event.startDate + i] === undefined) {
        hidEventsByDates[event.startDate + i] = [];
      }

      hidEventsByDates[event.startDate + i].push(event.id);
    }
  });

  return (
    <div className="events-row">
      { showedEvents.map(event => (
        <Event event={event} key={event.id} handleEventClick={handleEventClick} />
      ))}

      { hidEvents.length > 0 && Object.keys(hidEventsByDates).map((eventDate, i) => (
        <MoreEvents
          key={i}
          eventsIds={hidEventsByDates[eventDate]}
          eventDate={eventDate}
          handleEventClick={handleEventClick}
          rowPosition={showEventsCount + 1} />
      ))}
    </div>
  );
}

export default EventsRow;