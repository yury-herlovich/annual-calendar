import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import AddEditForm from './AddEditForm';

import { getEvent, updateEvent, addEvent } from '../../actions/calendarActions';

class AddEditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: undefined,
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      allDay: false,
      isLoading: true
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.id === undefined) {
      this.setState({isLoading: false});

      return;
    }

    let id = this.props.match.params.id;
    let event = this.props.events[id];

    if (event !== undefined) {
      this.setEventValues(event);
    } else {
      this.setState({id});
      this.props.getEvent(id);
    }
  }

  componentDidUpdate = (prevProps) => {
    let id = this.state.id;

    if (id === undefined) {
      return;
    }

    if (prevProps.events[id] === undefined && this.props.events[id]) {
      this.setEventValues(this.props.events[id]);
    }
  }

  setEventValues = (event) => {
    let startDate = moment(event.start.date || event.start.dateTime);
    let endDate = moment(event.end.date || event.end.dateTime);

    this.setState({
      id: event.id,
      title: event.summary,
      startDate: startDate.format('YYYY-MM-DD'),
      startTime: startDate.format('HH:mm'),
      endDate: endDate.format('YYYY-MM-DD'),
      endTime: endDate.format('HH:mm'),
      allDay: event.start.date !== undefined,
      isLoading: false
    });
  }

  handleInputChange = (e) => {
    let value = e.target.type !== 'checkbox' ? e.target.value : e.target.checked;
    this.setState({[e.target.name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let eventData = {
      summary: this.state.title,
      start: {},
      end: {}
    };

    if (this.state.allDay) {
      eventData.start.date = this.state.startDate;
      eventData.end.date = this.state.endDate;
    } else {
      eventData.start.dateTime = moment(`${this.state.startDate} ${this.state.startTime}`).toISOString();
      eventData.end.dateTime = moment(`${this.state.endDate} ${this.state.endTime}`).toISOString();
    }

    if (this.state.id !== undefined) {
      this.props.updateEvent(this.state.id, eventData);
    } else {
      this.props.addEvent(eventData);
    }
  }

  render() {
    if (this.state.isLoading) return null;

    return (
      <main>
        <AddEditForm
          eventData={this.state}
          year={this.props.year}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange} />
      </main>
    )
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year || new Date().getFullYear(),
  events: state.calendar.events
})

const mapDispatchToProps = {
  getEvent,
  updateEvent,
  addEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditEvent);