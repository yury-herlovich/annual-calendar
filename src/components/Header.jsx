import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auth from './Auth';
import { setYear } from '../actions/calendarActions';

import './Header.css';

class Header extends Component {
  componentDidMount = () => {
    const date = new Date();
    this.props.setYear(date.getFullYear());
  }

  handlePrevYearClick = () => {
    this.props.setYear(this.props.year - 1);
  }

  handleNextYearClick = () => {
    this.props.setYear(this.props.year + 1);
  }

  render() {
    return (
      <header id="main-header">
        <Auth />
        <div id="select-year">
          <span className="link-choose-year" onClick={this.handlePrevYearClick}>&lt;</span>
          <span className="year-view">{this.props.year}</span>
          <span className="link-choose-year" onClick={this.handleNextYearClick}>&gt;</span>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  year: state.calendar.year
});

const mapDispatchToProps = {
  setYear
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);