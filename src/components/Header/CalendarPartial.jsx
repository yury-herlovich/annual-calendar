import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';

import LoadingAnim from './LoadingAnim';
import SelectYear from './SelectYear';

import './CalendarPartial.css';

const CalendarPartial = ({match}) => (
  <div id="calendar-partial">
    <LoadingAnim />
    <Link to="/add"><Icon icon="plus" color="#333333" /></Link>
    <SelectYear match={match} />
  </div>
);

export default CalendarPartial;