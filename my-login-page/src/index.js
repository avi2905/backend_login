import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Profile from './profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
