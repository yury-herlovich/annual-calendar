import React from 'react';

const Button = ({name, text, handleClick, className}) => (
  <button name={name} onClick={handleClick} className={className}>{text}</button>
)

export default Button;