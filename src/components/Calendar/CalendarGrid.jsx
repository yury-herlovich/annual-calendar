import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './CalendarGrid.css';

import Month from './Month';

class CalendarGrid extends Component {
  constructor() {
    super();

    this.monthTitleFormat = 'MMM';
    this.dayTitleFormat = 'ddd/DD';

    this.state = {
      calendar: []
    };
  }

  componentDidMount = () => {
    let calendar = this.generateEmptyCalendarGrid();
    calendar = this.buildCalendarForYear(calendar);

    this.setState({calendar});
  }


  componentDidUpdate = (prevProps) => {
    if (prevProps.year !== this.props.year) {
      let calendar = this.buildCalendarForYear(this.state.calendar);

      this.setState({calendar});
    }
  }


  generateEmptyCalendarGrid = () => {
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
        title: moment().month(m).format(this.monthTitleFormat),
        days
      })
    }

    return calendar;
  }


  buildCalendarForYear = (calendar) => {
    let date = moment(`${this.props.year}-01-01 00:00:00`);

    // add dates to the calendar
    calendar = calendar.map((month, mInd) => {
      month.days.forEach((day, dInd) => {
        if (mInd === date.month()) {
          day.title = date.format(this.dayTitleFormat);
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

    return calendar;
  }


  render() {
    return (
      <section id="calendar-grid">
        {this.state.calendar.map((item) => (
          <Month key={item.id} data={item} />
        ))}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year
});

export default connect(mapStateToProps, {})(CalendarGrid);