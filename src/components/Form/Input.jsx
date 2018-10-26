import React from 'react';

const Input = ({type, name, value, handleChange, placeholder}) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    id={name}
    value={value}
    onChange={handleChange} />
)

export default Input;