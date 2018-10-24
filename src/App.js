import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { loadGoogleAPI } from './actions/calendarActions';
import Calendar from './components/Calendar';
import Header from './components/Header';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.loadGoogleAPI();
  }

  render() {
    if (!this.props.googleClientLoaded) return null;

    return (
      <div className="App">
        {/* Header */}
        <Switch>
          <Route exact path="/" component={Header} />
          <Route path="/year/:year" component={Header} />
        </Switch>

        {/* Content */}
        <Switch>
          <Route exact path="/" component={Calendar} />
          <Route path="/year/:year" component={Calendar} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  googleClientLoaded: state.calendar.googleClientLoaded
});

const mapDispatchToProps = {
  loadGoogleAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
