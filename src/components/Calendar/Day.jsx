import React from 'react';
import './Day.css';

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
    </div>
  )
};

export default Day;