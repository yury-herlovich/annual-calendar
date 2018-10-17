import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Calendar.css';

import { generateCalendar } from '../utils/utils';
import { setYear, getEvents } from '../actions/calendarActions';

import Month from './Month';

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      calendar: [],
      events: []
    }
  }

  componentDidMount(){
    const date = new Date();
    this.createCalendar(date.getFullYear());
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let calendar = JSON.parse(JSON.stringify(prevState.calendar));

    if (nextProps.events.length === 0) {
      return {events: []};
    }

    nextProps.events.forEach((item) => {
      let startDate = item.start.dateTime ? moment(item.start.dateTime) : moment(item.start.date);
      let endDate = item.end.dateTime ? moment(item.end.dateTime) : moment(item.end.date);

      while (startDate.diff(endDate) <= 0) {
        if (startDate.year() !== nextProps.year) break;

        let mId = startDate.month();  // month 0-11
        let dId = startDate.date() -1;  // days 1-31

        if (calendar[mId] && calendar[mId].days[dId]) {
          calendar[mId].days[dId].events.push({
            title: item.summary,
            id: item.id
          });
        }

        startDate.add(1, 'd');
      }
    });

    return {
      events: nextProps.events,
      calendar
    };
  }

  createCalendar = (year) => {
    this.props.setYear(year);
    this.props.getEvents(year);

    let calendar = generateCalendar(year);

    this.setState({calendar, events: []});
  }

  render() {
    if (this.state.calendar.length === 0) {
      return null;
    }

    return (
      <main id="calendar">
        { this.state.calendar.map((item) => (
          <Month key={item.id} days={item.days} date={item.date} />
        ))}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  events: state.calendar.events,
  year: state.calendar.year
});

const mapDispatchToProps = {
  setYear,
  getEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);