import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadGoogleAPI } from './actions/calendarActions';
import Calendar from './components/Calendar';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.loadGoogleAPI();
  }

  render() {
    if (!this.props.googleClientLoaded) return null;

    return (
      <div className="App">
        <Calendar />
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
