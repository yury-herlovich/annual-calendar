import React from 'react';
import './Header.css';

const Header = ({year, handlePrevYearClick, handleNextYearClick}) => (
  <header id="main-header">
    <span className="link-choose-year" onClick={handlePrevYearClick}>&lt;</span>
    {year}
    <span className="link-choose-year" onClick={handleNextYearClick}>&gt;</span>
  </header>
);

export default Header;