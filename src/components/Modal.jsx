import React from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
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
            { console.log(item) }
            <header className="modal-event-header">{item.summary}</header>
            <div className="modal-event-info">
              <div className="modal-event-date">
                { (item.start.dateTime && moment(item.start.dateTime).format('dddd, MMMM DD, hh:mma')) ||
                  (item.start.date && moment(item.start.date).format('dddd, MMMM DD')) }
                &nbsp;-&nbsp;
                { (item.end.dateTime && moment(item.end.dateTime).format('dddd, MMMM DD, hh:mma')) ||
                  (item.end.date && moment(item.end.date).format('dddd, MMMM DD')) }
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

export default Modal;