import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Calendar.css';

import CalendarGrid from './Calendar/CalendarGrid';
import Events from './Events/Events';

class Calendar extends Component {
  render() {
    if (this.props.year === null) return null;

    return (
      <main id="calendar">
        <CalendarGrid />
        <Events />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);