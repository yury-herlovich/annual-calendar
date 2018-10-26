import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './Auth';
import CalendarPartial from './CalendarPartial';

import './Header.css';

const Header = () => (
  <header id="main-header">
    <Auth />

    <Switch>
      <Route exact path='/' component={CalendarPartial}/>
      <Route path='/year/:year' component={CalendarPartial}/>
    </Switch>
  </header>
);

export default Header;
