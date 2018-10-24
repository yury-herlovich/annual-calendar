import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auth from './Auth';
import LoadingAnim from './LoadingAnim';
import SelectYear from './SelectYear';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <header id="main-header">
        <Auth />
        <LoadingAnim isLoading={this.props.isLoading} />
        <SelectYear match={this.props.match} />
      </header>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.calendar.isLoading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
