import React from 'react';
import _ from 'lodash';
import './Event.css';

const Event = ({event}) => {
  if (_.isEmpty(event) || event.dayNum !== 0) {
    return <div className="empty-event"></div>;
  }

  return (
    <div className="event" style={{width: `calc((100% + 1px) * ${event.eventLength})`}}>{event.title}</div>
  )
};

export default Event;