import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

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

        <Switch>
          <Route path='/year/:year' component={SelectYear}/>
          <Route component={SelectYear}/>
        </Switch>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.calendar.isLoading
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
