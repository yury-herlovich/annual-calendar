import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Calendar.css';

import CalendarGrid from './Calendar/CalendarGrid';
import EventsContainer from './Events/EventsContainer';
import ModalContainer from './Modal/ModalContainer';

class Calendar extends Component {
  render() {
    if (this.props.year === null) return null;

    return (
      <main id="calendar">
        <CalendarGrid />
        <EventsContainer />
        <ModalContainer />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);