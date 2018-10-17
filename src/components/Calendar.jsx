import React, { Component } from 'react';
import { connect } from 'react-redux';

import { generateCalendar } from '../utils/utils';
import { setYear, getEvents } from '../actions/calendarActions';

import Month from './Month';

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      calendar: []
    }
  }

  componentDidMount(){
    const date = new Date();
    this.createCalendar(date.getFullYear());
  }

  createCalendar = (year) => {
    this.props.setYear(year);
    this.props.getEvents(year);

    let calendar = generateCalendar(year);

    this.setState({calendar});
  }

  render() {
    if (this.state.calendar.length === 0) {
      return null;
    }

    return (
      this.state.calendar.map((item) => (
        <Month key={item.id} days={item.days} title={item.title} />
      ))
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  setYear,
  getEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);