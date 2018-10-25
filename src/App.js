import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { loadGoogleAPI } from './actions/calendarActions';
import Calendar from './components/Calendar';
import Header from './components/Header/Header';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.loadGoogleAPI();
  }

  render() {
    if (!this.props.googleClientLoaded) return null;

    return (
      <div className="App">
        <Header />

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
