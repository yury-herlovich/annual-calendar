import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Calendar.css';
import LoadingAnim from './LoadingAnim';

import { generateCalendar } from '../utils/utils';
import { setYear, getEvents } from '../actions/calendarActions';

import Header from './Header';
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

      for (;startDate.diff(endDate) <= 0; startDate.add(1, 'd')) {
        if (startDate.year() !== nextProps.year) continue;

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

    return {
      events: nextProps.events,
      calendar
    };
  }

  createCalendar = (year) => {
    this.props.setYear(year);

    let calendar = generateCalendar(year);
    this.setState({calendar, events: []});

    this.props.getEvents(year);
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

  handlePrevYearClick = () => {
    let year = this.props.year - 1;
    this.createCalendar(year);
  }

  handleNextYearClick = (e) => {
    let year = this.props.year + 1;
    this.createCalendar(year);
  }

  render() {
    return (
      <main id="calendar">
        <LoadingAnim isLoading={this.props.isLoading} />

        <Header
          year={this.props.year}
          handlePrevYearClick={this.handlePrevYearClick}
          handleNextYearClick={this.handleNextYearClick}
          />

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
  isLoading: state.calendar.isLoading
});

const mapDispatchToProps = {
  setYear,
  getEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);