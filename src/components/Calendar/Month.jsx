import React from 'react';

import Day from './Day';

const Month = ({ data}) => (
  <section className="month">
    <header className="month-header">{data.title}</header>

    { data.days.map((item) => (
      <Day key={item.id} data={item} />
    ))}
  </section>
);

export default Month;