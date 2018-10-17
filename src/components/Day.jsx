import React from 'react';
import moment from 'moment';

const Day = ({item}) => {
  return (
    <div className={'day' + (moment().startOf('date').diff(item.date, 'hours') === 0 ? ' today' : '')}>
      <header className="day-header">{moment(item.date).format('ddd/DD')}</header>
    </div>
  )
};

export default Day;