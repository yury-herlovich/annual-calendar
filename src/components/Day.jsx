import React from 'react';
import moment from 'moment';
import './Day.css';

import Event from './Event';

const Day = ({dayData, handleModalOpen}) => {
  let dayClass = ['day'];

  if (moment().startOf('date').diff(dayData.date, 'hours') === 0) {
    dayClass.push('today');
  }

  if (dayData.events.length > 0) {
    dayClass.push('day-with-events');
  }

  return (
    <div
      className={dayClass.join(' ')}
      onClick={(e) => handleModalOpen(e, dayData.events)}>
      <header className="day-header">{moment(dayData.date).format('ddd/DD')}</header>

      { dayData.events.map((item) => (
        <Event key={item.id} event={item} />
      ))}
    </div>
  )
};

export default Day;