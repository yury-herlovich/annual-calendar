import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Modal = ({clickPos, modalIsOpen, handleClose, events}) => {
  let modalPos = calculatePosition(clickPos);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      style={{overlay: {'background-color': 'rgba(0, 0, 0, 0.15)'}, content: modalPos}}>

      { events.length > 0 &&
        events.map((item) => (
          <header>{item.title}</header>
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