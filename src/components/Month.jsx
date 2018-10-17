import React from 'react';

import Day from './Day';

const Month = ({days, title}) => (
  <section>
    <header>{title}</header>

    { days.map((item) => (
      <Day key={item.id} />
    ))}
  </section>
);

export default Month;