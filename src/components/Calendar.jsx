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
      calendar: []
    }
  }

  componentDidUpdate(prevProps){
    // update year
    if (prevProps.year !== this.props.year) {
      this.createCalendar(this.props.year);
    }

    // user signed in
    if (!prevProps.userIsSignIn && this.props.userIsSignIn) {
      this.props.getEvents(this.props.year);
    }

    // user signed out
    if (prevProps.userIsSignIn && !this.props.userIsSignIn) {
      this.cleanCalendar();
    }

    // fill events
    if (prevProps.events !== this.props.events) {
      this.fillTheCalendarWithEvents(this.props.events);
    }
  }

  createCalendar = (year) => {
    setTimeout(() => {
      let calendar = generateCalendar(year);
      this.setState({calendar});

      if (this.props.userIsSignIn) {
        this.props.getEvents(year);
      }
    }, 0);
  }

  fillTheCalendarWithEvents = (events) => {
    if (this.state.calendar.length === 0) return;
    if (events.length === 0) return;

    let calendar = JSON.parse(JSON.stringify(this.state.calendar));

    events.forEach((item) => {
      let startDate = item.start.dateTime ? moment(item.start.dateTime) : moment(item.start.date);
      let endDate = item.end.dateTime ? moment(item.end.dateTime) : moment(item.end.date).subtract(1, 'd');

      for (;startDate.diff(endDate) <= 0; startDate.add(1, 'd')) {
        if (startDate.year() !== this.props.year) continue;

        let mId = startDate.month();  // month 0-11
        let dId = startDate.date() -1;  // days 1-31

        if (calendar[mId] && calendar[mId].days[dId]) {
          calendar[mId].days[dId].events.push({
            title: item.summary,
            id: item.id
          });
        }
      }
    });

    this.setState({calendar});
  }

  cleanCalendar = () => {
    let calendar = this.state.calendar.map((month) => {
      month.days.forEach((day) => {
        day.events = [];
      });

      return month;
    });

    this.setState({calendar});
  }

  handleModalOpen = (e, events) => {
    if (events.length <= 0) return;

    let eventsIds = events.map((item) => item.id);
    let eventsWithFullInfo = this.props.events.filter((item) => eventsIds.indexOf(item.id) !== -1);

    this.setState({
      modalIsOpen: true,
      modalEvents: eventsWithFullInfo,
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
    return (
      <main id="calendar">
        { this.state.calendar.length === 0 ?

          null :

          this.state.calendar.map((item) => (
            <Month key={item.id} days={item.days} date={item.date} handleModalOpen={this.handleModalOpen} />
          ))
        }

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
  year: state.calendar.year,
  userIsSignIn: state.auth.isSignIn
});

const mapDispatchToProps = {
  setYear,
  getEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);