import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from './actions/authActions';

import Calendar from './components/Calendar';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.signIn();
  }

  render() {
    if (!this.props.isSignIn) return null;

    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignIn: state.auth.isSignIn
});

const mapDispatchToProps = {
  signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
