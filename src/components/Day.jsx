import React from 'react';
import moment from 'moment';

const Day = ({item}) => (
  <div className="day">
    <header className="day-header">{moment(item.date).format('ddd/DD')}</header>
  </div>
);

export default Day;