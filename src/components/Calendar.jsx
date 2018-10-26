import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import './Calendar.css';

import { setYear, getEvents } from '../actions/calendarActions';

import Month from './Month';
import Modal from './Modal';

const monthTitleFormat = 'MMM';
const dayTitleFormat = 'ddd/DD';

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalEvents: [],
      modalClickPos: {},
      calendar: [],
      year: null
    }
  }


  componentDidMount = () => {
    if (this.props.year === null) {
      let calendar = this.generateEmptyCalendar();
      this.setState({calendar});
    } else {
      this.buildCalendar();
      this.addEventsToTheCalendar();
      this.props.getEvents(this.props.year);
    }
  }


  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.year !== this.props.year && this.props.year !== null) {
      this.buildCalendar();
      this.addEventsToTheCalendar();
      this.props.getEvents(this.props.year);
    }

    if (prevProps.events !== this.props.events) {
      this.addEventsToTheCalendar();
    }
  }


  generateEmptyCalendar = () => {
    let calendar = [];

    for (let m = 0; m < 12; m++) {
      let days = [];
      for (let d = 0; d < 31; d++) {
        days.push({
          id: `${m}-${d}`,
          title: null,
          isToday: false,
          events: []
        });
      }

      calendar.push({
        id: m,
        title: moment().month(m).format(monthTitleFormat),
        days
      })
    }

    return calendar;
  }


  buildCalendar = () => {
    let prevCalendar = this.state.calendar.length > 0 ? this.state.calendar : this.generateEmptyCalendar();
    let date = moment(`${this.props.year}-01-01 00:00:00`);

    // add dates to the calendar
    let calendar = prevCalendar.map((month, mInd) => {
      month.days.forEach((day, dInd) => {
        if (mInd === date.month()) {
          day.title = date.format(dayTitleFormat);
          day.isToday = false;
          day.events = [];

          date.add(1, 'd');
        } else {
          day.title = null;
        }
      });

      return month;
    });

    // set today
    if (moment().year() === this.props.year) {
      let month = moment().month();
      let day = moment().date();

      calendar[month].days[day - 1].isToday = true;
    }

    this.setState({calendar});
  }

  addEventsToTheCalendar = () => {
    if (this.state.calendar.length === 0) return;
    if (_.isEmpty(this.props.events)) return;

    let calendar = this.state.calendar;
    let events = this.props.events;

    Object.keys(events).forEach((eventId) => {
      let event = events[eventId];

      let startDate = event.start.dateTime ? moment(event.start.dateTime) : moment(event.start.date);
      let endDate = event.end.dateTime ? moment(event.end.dateTime) : moment(event.end.date).subtract(1, 'd');

      for (;startDate.diff(endDate) <= 0; startDate.add(1, 'd')) {
        if (startDate.year() !== this.props.year) continue;

        let mId = startDate.month();  // month 0-11
        let dId = startDate.date() -1;  // days 1-31

        if (calendar[mId] === undefined || calendar[mId].days[dId] === undefined) continue;

        _.remove(calendar[mId].days[dId].events, (item) => item.id === eventId);

        calendar[mId].days[dId].events.push({
          title: event.summary,
          id: eventId
        });
      }
    })

    this.setState({calendar});
  }


  handleModalOpen = (e, eventsIds) => {
    if (eventsIds.length <= 0) return;

    let events = eventsIds.map((item) => this.props.events[item.id]);

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
    return (
      <main id="calendar">
        { this.state.calendar.length === 0 ?

          null :

          this.state.calendar.map((item) => (
            <Month key={item.id} data={item} handleModalOpen={this.handleModalOpen} />
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