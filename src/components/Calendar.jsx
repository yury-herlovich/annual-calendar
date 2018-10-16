import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setYear } from '../actions/calendarActions';

class Calendar extends Component {
  componentDidMount(){
    const date = new Date();
    this.props.setYear(date.getFullYear());
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  setYear
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);