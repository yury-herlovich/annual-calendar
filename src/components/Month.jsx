import React from 'react';
import moment from 'moment';

import Day from './Day';

const Month = ({days, date, handleModalOpen}) => (
  <section className="month">
    <header className="month-header">{moment(date).format('MMM')}</header>

    { days.map((item) => (
      <Day key={item.id} dayData={item} handleModalOpen={handleModalOpen} />
    ))}
  </section>
);

export default Month;