import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createCalendar } from '../actions/calendarActions';

class Calendar extends Component {
  componentDidMount(){
    const date = new Date();
    this.props.createCalendar(date.getFullYear());
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  createCalendar
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);