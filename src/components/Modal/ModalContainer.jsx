import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModalWindow } from '../../actions/modalActions';

import Modal from './Modal';

class ModalContainer extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      events: []
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.eventsIdsForModal.length === 0 && this.props.eventsIdsForModal.length > 0) {
      let events = this.props.events.filter(event => this.props.eventsIdsForModal.indexOf(event.id) !== -1);

      this.setState({events, modalIsOpen: true});
    }
  }

  componentWillUnmount = () => {
    this.props.closeModalWindow();
  }

  handleClose = () => {
    this.setState({events: [], modalIsOpen: false});
    this.props.closeModalWindow();
  }

  calculatePosition = () => {
    let clickPos = this.props.clickCoordinates;

    if (!clickPos.y || !clickPos.x) return {};

    let top, bottom, left, right;
    let marginX = 20;
    let marginYError = 75;
    let marginY = 25;

    if (window.innerWidth / 2 > clickPos.x) {
      left = clickPos.x + marginX;
      right = 'none';
    } else {
      left = 'none';
      right = window.innerWidth - (clickPos.x) + marginX;
    }

    if (window.innerHeight / 2 > clickPos.y - marginYError) {
      top = clickPos.y - marginYError - marginY;
      bottom = 'none';
    } else {
      top = 'none';
      bottom = window.innerHeight - (clickPos.y - marginYError) - marginY;
    }

    top = top <= marginY ? marginY : top;
    bottom = bottom <= marginY ? marginY : bottom;

    return {top, bottom, left, right}
  }

  render() {
    return (
      <Modal
        modalPos={this.calculatePosition()}
        modalIsOpen={this.state.modalIsOpen}
        handleClose={this.handleClose}
        events={this.state.events} />
    )
  }
}

const mapStateToProps = state => ({
  events: state.calendar.events,
  eventsIdsForModal: state.modal.eventsIds,
  clickCoordinates: state.modal.clickCoordinates
});

const mapDispatchToProps = {
  closeModalWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);