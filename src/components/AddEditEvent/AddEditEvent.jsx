import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from '../Form/Form';
import Input from '../Form/Input';
import Checkbox from '../Form/Checkbox';
import Button from '../Form/Button';

import './AddEditEvent.css';

class AddEditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      allDay: false
    }
  }

  handleInputChange = (e) => {
    let target = e.target;

    let value = target.type !== 'checkbox' ? target.value : target.checked;

    this.setState({[target.name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
  }

  handleCancel = (e) => {
    e.preventDefault();


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
  year: state.calendar.year || new Date().getFullYear()
})

export default connect(mapStateToProps, {})(AddEditEvent);