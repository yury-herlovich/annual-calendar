import React, { Component } from 'react';
import { connect } from 'react-redux';

import icon from '../../img/loading.svg';

class LoadingAnim extends Component {
  render() {
    return (
      <div id="loading-animation">
        {this.props.isLoading && <img src={icon} alt="" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.calendar.isLoading
})

export default connect(mapStateToProps, {})(LoadingAnim);