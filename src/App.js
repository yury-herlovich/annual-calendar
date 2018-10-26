import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { loadGoogleAPI } from './actions/calendarActions';
import Header from './components/Header/Header';
import Calendar from './components/Calendar';
import AddEditEvent from './components/AddEditEvent/AddEditEvent';


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
          <Route path="/add" component={AddEditEvent} />
          <Route path="/edit/:id" component={AddEditEvent} />
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
