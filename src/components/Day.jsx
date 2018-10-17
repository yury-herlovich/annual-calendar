import React from 'react';
import moment from 'moment';
import './Day.css';

import Event from './Event';

const Day = ({dayData}) => (
  <div className={'day' + (moment().startOf('date').diff(dayData.date, 'hours') === 0 ? ' today' : '')}>
    <header className="day-header">{moment(dayData.date).format('ddd/DD')}</header>

    { dayData.events.map((item) => (
      <Event key={item.id} event={item} />
    ))}
  </div>
);

export default Day;