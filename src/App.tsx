// import { Route, Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';

import './App.css'

const StyledWrapper = styled.main`
  grid-row: 2;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
`

function App() {
  return (
    <div className="App">
      <Header />
      <StyledWrapper>
        <CalendarGrid />
      </StyledWrapper>

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
