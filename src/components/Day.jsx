import React from 'react';
import './Day.css';

import Event from './Event';

const Day = ({data, handleModalOpen}) => {
  if (data.title === null) {
    return <div className="day-empty"></div>
  }

  let dayClass = ['day'];

  if (data.isToday) {
    dayClass.push('today');
  }

  if (data.events.length > 0) {
    dayClass.push('day-with-events');
  }

  return (
    <div
      className={dayClass.join(' ')}
      onClick={(e) => handleModalOpen(e, data.events)}>
      <header className="day-header">{data.title}</header>

      { data.events.map((item, i) => (
        <Event key={item.id} event={item} />
      ))}
    </div>
  )
};

export default Day;