import React from 'react';

const Button = ({name, text, handleClick}) => (
  <button name={name} onClick={handleClick}>{text}</button>
)

export default Button;