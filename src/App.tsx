import { lazy } from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';

import './App.css'

const CalendarGrid = lazy(() => import("./components/CalendarGrid"))

export type CalendarParams = {
  year?: string
}

const StyledApp = styled.div`
  display: grid;
  box-sizing: border-box;
  min-height: 100vh;
  grid-template-rows: 45px 1fr;
`

const StyledWrapper = styled.main`
  padding: 0 10px 10px 10px;
  grid-row: 2;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
`

function Template() {
  return (
    <>
      <Header />
      <StyledWrapper>
        <Outlet />
      </StyledWrapper>
    </>
  )
}

function App() {
  return (
    <StyledApp>
      <Router>
        <Routes>
          {/* <Route path="/add" component={AddEditEvent} /> */}
          {/* <Route path="/edit/:id" component={AddEditEvent} /> */}
          <Route element={<Template />}>
            <Route index element={<CalendarGrid />} />
            <Route path="/year/:year" element={<CalendarGrid />} />
          </Route>
        </Routes>
      </Router>
    </StyledApp>
  )
}

export default App;
