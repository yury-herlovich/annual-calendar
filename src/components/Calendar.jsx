import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Calendar.css';

import { generateCalendar } from '../utils/utils';
import { setYear, getEvents } from '../actions/calendarActions';

import Month from './Month';
import Modal from './Modal';

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalEvents: [],
      modalClickPos: {},
      calendar: [],
      events: []
    }
  }

  componentDidMount(){
    const date = new Date();
    this.createCalendar(date.getFullYear());
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.events.length === 0 && prevState.events.length === 0) return {};
    if (nextProps.events === prevState.events) return {};

    let calendar = JSON.parse(JSON.stringify(prevState.calendar));

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

  handleModalOpen = (e, events) => {
    if (events.length <= 0) return;

    this.setState({
      modalIsOpen: true,
      modalEvents: events,
      modalClickPos: {x: e.screenX, y: e.screenY}
    });
  }

  handleModalClose = () => {
    this.setState({
      modalIsOpen: false,
      modalEvents: [],
      modalClickPos: {}
    });
  }

  render() {
    if (this.state.calendar.length === 0) {
      return null;
    }

    return (
      <main id="calendar">
        { this.state.calendar.map((item) => (
          <Month key={item.id} days={item.days} date={item.date} handleModalOpen={this.handleModalOpen} />
        ))}
        <Modal
          modalIsOpen={this.state.modalIsOpen}
          handleClose={this.handleModalClose}
          events={this.state.modalEvents}
          clickPos={this.state.modalClickPos} />
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