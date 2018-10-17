import React from 'react';

const Day = ({item}) => (
  <div className="day">
    <header className="day-header">{item.dayTitle} {item.date}</header>
  </div>
);

export default Day;