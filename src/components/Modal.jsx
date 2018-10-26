import React from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
import { Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import './Modal.css';

ReactModal.setAppElement('#root');

const Modal = ({clickPos, modalIsOpen, handleClose, events}) => {
  let modalPos = calculatePosition(clickPos);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.15)'}, content: modalPos}}>

      { events.length > 0 &&
        events.map((item, i) => (
          <section key={i} className="modal-event">
            <header className="modal-event-header">
              <span>{item.summary}</span>
              <Link to={'/edit/' + item.id}>
                <Icon icon="edit" color="#333333" />
              </Link>
            </header>
            <div className="modal-event-info">
              <div className="modal-event-date">
                { dates(item.start.dateTime, item.start.date, item.end.dateTime, item.end.date) }
              </div>
            </div>
          </section>
        ))
      }
    </ReactModal>
  )
}


let calculatePosition = (clickPos) => {
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

const dates = (startDateTime, startDate, endDateTime, endDate) => {
  let start = startDateView(startDateTime, startDate);
  let end = endDateView(endDateTime, endDate, startDate);

  return end !== null ? `${start} - ${end}` : `${start}`;
}

const dateTemplate = 'dddd, MMMM DD';
const dateTimeTemplate = 'dddd, MMMM DD, hh:mma';

const startDateView = (dateTime, date) => (
  (dateTime && moment(dateTime).format(dateTimeTemplate)) ||
  (date && moment(date).format(dateTemplate))
);

const endDateView = (dateTime, endDate, startDate) => {
  if (dateTime) {
    return moment(dateTime).format(dateTimeTemplate);
  }

  if (moment(endDate).diff(startDate, 'd') === 1) {
    return null;
  }

  return moment(endDate).subtract(1, 'd').format(dateTemplate)
};

export default Modal;