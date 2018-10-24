import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsSignIn } from '../../api/googleAuthAPI';

import { setSignIn, setSignOut, signIn, signOut } from '../../actions/authActions';

import logo from '../../img/google_logo.svg';

class Auth extends Component {
  componentDidMount = () => {
    userIsSignIn().then((isSignIn) => {
      if (isSignIn) {
        this.props.setSignIn();
      } else {
        this.props.setSignOut();
      }
    });
  }

  handleSignIn = () => {
    if (!this.props.userIsSignIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  }

  render() {
    if (this.props.userIsSignIn === undefined) return <div id="auth-link"></div>;

    return (
      <div id="auth-link" onClick={this.handleSignIn} >
        <img width="17" height="17" src={logo} id="auth-logo" alt="" />
        <div id="auth-text">{ this.props.userIsSignIn ? 'Sign Out' : 'Sign In' }</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userIsSignIn: state.auth.isSignIn
});

const mapDispatchToProps = {
  setSignIn,
  setSignOut,
  signIn,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);