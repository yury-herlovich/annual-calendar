import React from 'react';
// import { Route, Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />

      {/* Content */}
      {/* <Router>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/add" component={AddEditEvent} />
          <Route path="/edit/:id" component={AddEditEvent} />
          <Route path="/year/:year" component={Calendar} />
          <Route element={Calendar} />
        </Routes>
        </Suspense>
      </Router> */}
    </div>
  );
}

export default App;
