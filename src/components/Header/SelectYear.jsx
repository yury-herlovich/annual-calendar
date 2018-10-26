import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setYear } from '../../actions/calendarActions';

import './SelectYear.css'

class SelectYear extends Component {
  componentDidMount = () => {
    this.setYear();
  }

  componentDidUpdate = (props) => {
    this.setYear();
  }

  setYear = () => {
    let year = this.props.match.params.year || new Date().getFullYear();
    this.props.setYear(Number(year));
  }

  render() {
    if (this.props.year === null) return null;

    return (
      <div id="select-year">
        <Link to={'/year/' + (this.props.year - 1)} className="link-choose-year">&lt;</Link>
        <span className="year-view">{this.props.year}</span>
        <Link to={'/year/' + (this.props.year + 1)} className="link-choose-year">&gt;</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year || null
});

const mapDispatchToProps = {
  setYear
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectYear);