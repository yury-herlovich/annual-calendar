import React from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
import { Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import './Modal.css';



const Modal = ({modalPos, modalIsOpen, handleClose, events}) => {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.15)'}, content: modalPos}}>

      { events.length > 0 &&
        events.map((item, i) => (
          <section key={i} className="modal-event">
            <header className="modal-event-header">
              <Link to={'/edit/' + item.id} className="modal-edit-link">
                <span>{item.summary}</span>
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