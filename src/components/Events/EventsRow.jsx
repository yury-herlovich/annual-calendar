import React from 'react';
import './EventsRow.css';

import Event from './Event';
import MoreEvents from './MoreEvents';

const showEventsCount = 2;

const EventsRow = ({events, handleEventClick}) => {
  let showedEvents = [];
  let hidEvents = [];
  let showAll = true;

  // seporate event array, and if there is a lot of events hide them
  events.forEach(event => {
    if (event.rowPosition <= showEventsCount) {
      showedEvents.push(event);
    } else {
      hidEvents.push(event);
    }

    if (event.rowPosition > showEventsCount + 1) {
      showAll = false;
    }
  });

  // group hid events by dates, if it will be showed
  let hidEventsByDates = {};
  if (showAll) {
    showedEvents = events;
  } else {
    // { date: [ids]}
    hidEvents.forEach(event => {
      for(let i = 0; i < event.eventLength; i++) {
        if (hidEventsByDates[event.startDate + i] === undefined) {
          hidEventsByDates[event.startDate + i] = [];
        }

        hidEventsByDates[event.startDate + i].push(event.id);
      }
    });
  }

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