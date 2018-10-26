import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Form from '../Form/Form';
import Input from '../Form/Input';
import Checkbox from '../Form/Checkbox';
import Button from '../Form/Button';

import './AddEditEvent.css';
import { getEvent } from '../../actions/calendarActions';

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
      allDay: false
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.id === undefined) {
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
      allDay: event.start.date !== undefined
    });
  }

  handleInputChange = (e) => {
    let value = e.target.type !== 'checkbox' ? e.target.value : e.target.checked;
    this.setState({[e.target.name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
  }

  render() {
    return (
      <main>
        <Form handleSubmit={this.handleSubmit} className="form add-edit-form">
          <div className='form-group'>
            <Input
              type='text'
              name='title'
              placeholder='Add title'
              value={this.state.title}
              handleChange={this.handleInputChange} />
          </div>

          <div className='form-group'>
            <Input
              type='date'
              name='startDate'
              value={this.state.startDate}
              handleChange={this.handleInputChange} />

            { !this.state.allDay &&
              <Input
                type='time'
                name='startTime'
                value={this.state.startTime}
                handleChange={this.handleInputChange} />
            }

            &nbsp;-&nbsp;

            <Input
              type='date'
              name='endDate'
              value={this.state.endDate}
              handleChange={this.handleInputChange} />

            { !this.state.allDay &&
              <Input
                type='time'
                name='endTime'
                value={this.state.endTime}
                handleChange={this.handleInputChange} />
            }
          </div>

          <div className="form-group">
            <Checkbox name="allDay" value={this.state.allDay} handleChange={this.handleInputChange} />
            <label htmlFor="allDay">All day</label>
          </div>

          <div className="form-buttons form-group">
            <Button name='submit' text='Save' handleClick={this.handleSubmit} />
            <Link to={'/year/' + this.props.year}>
              <Button name='cancel' text='Cancel' />
            </Link>
          </div>
        </Form>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year || new Date().getFullYear(),
  events: state.calendar.events
})

const mapDispatchToProps = {
  getEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditEvent);