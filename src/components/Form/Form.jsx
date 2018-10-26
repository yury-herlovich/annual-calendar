import React from 'react';

import './Form.css';

const Form = ({children, handleSubmit, className}) => (
  <form onSubmit={handleSubmit} className={className}>
    { children }
  </form>
);

export default Form;