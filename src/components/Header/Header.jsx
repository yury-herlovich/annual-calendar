import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './Auth';
import CalendarPartial from './CalendarPartial';

import './Header.css';

const Header = () => (
  <header id="main-header">
    <Auth />

    {/* 'exact home' breaks down redirect after login  */}
    <Switch>
      <Route path="/add" component={null} />
      <Route path="/edit/:id" component={null} />
      <Route path='/year/:year' component={CalendarPartial}/>
      <Route component={CalendarPartial}/>
    </Switch>
  </header>
);

export default Header;
