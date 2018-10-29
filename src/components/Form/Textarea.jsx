import React from 'react';

const Textarea = ({ name, value, handleChange, placeholder, height}) => (
  <textarea name={name} placeholder={placeholder} onChange={handleChange} style={{height: height}}>
    {value}
  </textarea>
)

export default Textarea;