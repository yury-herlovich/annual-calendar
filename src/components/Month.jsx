import React from 'react';

import Day from './Day';

const Month = ({days, title}) => (
  <section className="month">
    <header className="month-header">{title}</header>

    { days.map((item) => (
      <Day key={item.id} item={item} />
    ))}
  </section>
);

export default Month;