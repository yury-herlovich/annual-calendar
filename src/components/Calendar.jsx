import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Calendar.css';

import { generateCalendar } from '../utils/utils';
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
    let calendar = this.generateCalendar();

    this.setState({calendar});
  }


  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.year !== this.props.year && this.props.year !== null) {
      this.rebuildCalendar();
    }
  }


  generateCalendar = () => {
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


  rebuildCalendar = () => {
    let date = moment(`${this.props.year}-01-01 00:00:00`);

    // add dates to the calendar
    let calendar = this.state.calendar.map((month, mInd) => {
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