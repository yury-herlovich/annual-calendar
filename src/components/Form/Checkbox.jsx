import React from 'react';

const Checkbox = ({ name, value, handleChange}) => (
    <input
        type="checkbox"
        name={name}
        id={name}
        checked={value}
        onChange={handleChange} />
)

export default Checkbox;