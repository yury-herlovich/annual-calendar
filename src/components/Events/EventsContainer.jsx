import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getEvents } from '../../actions/calendarActions';

import './EventsContainer.css';
import EventsRow from './EventsRow';

class EventsContainer extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    }
  }

  componentDidMount = () => {
    let events = this.generateEventsGrid();

    this.setState({events});

    this.props.getEvents(this.props.year);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.year !== this.props.year) {
      this.props.getEvents(this.props.year);

      let events = this.generateEventsGrid();
      this.setState({events});
    }

    if (prevProps.storeEvents !== this.props.storeEvents) {
      console.log('new events');
      this.setEvents(this.props.storeEvents);
    }
  }


  generateEventsGrid = () => {
    let events = [];

    // generate events grid
    for (let i = 0; i < 12; i++) {
      events.push([]);
    }

    return events;
  }

  setEvents = (storeEvents) => {
    let events = this.generateEventsGrid();

    storeEvents.forEach(event => {
      let startDate = event.start.date ?
                        moment(event.start.date + ' 00:00:00') :
                        moment(event.start.dateTime).startOf('day');

      let endDate = event.end.date ?
                        moment(event.end.date + ' 23:59:59').subtract(1, 'd') :
                        moment(event.end.dateTime).endOf('day');

      let procDate = startDate.clone();


      while (endDate.diff(procDate, 'h') > 0 ) {
        let endMonth = procDate.clone().endOf('month');
        let eventLength;

        if (endDate.diff(endMonth) > 0) {
          eventLength = endMonth.diff(procDate, 'd') + 1;
        } else {
          eventLength = endDate.diff(procDate, 'd') + 1;
        }

        if (procDate.year() === this.props.year) {
          let monthInd = procDate.month();   // month 0 - 11
          let dayInd = procDate.date();      // day 1 - 31

          events[monthInd].push({
            id: event.id,
            title: event.summary,
            startDate: dayInd,
            eventLength,
            rowPosition: this.findEventRowPosition(events[monthInd], dayInd, eventLength)
          })
        }


        procDate.add(eventLength, 'd');
      }
    });

    this.setState({events});
  }

  findEventRowPosition = (events, eventStartDate, eventLength) => {
    let position = 1;
    let occupied = [];

    let eventEndDate = eventStartDate + eventLength - 1;

    events.forEach(event => {
      let start = event.startDate;
      let end = event.startDate + event.eventLength - 1;

      if (eventEndDate >= start && eventEndDate <= end ||
        eventStartDate >= start && eventStartDate <= end ) {
        occupied.push(event.rowPosition);
      }
    });

    while (true) {
      if (occupied.indexOf(position) === -1) {
        break;
      }

      position++;
    }

    return position;
  }

  render() {
    return (
      <section id="events">
        { this.state.events.map((item, i) => (
          <EventsRow key={i} events={item} />
        ))}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year,
  storeEvents: state.calendar.events
});

const mapDispatchToProps = {
  getEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);