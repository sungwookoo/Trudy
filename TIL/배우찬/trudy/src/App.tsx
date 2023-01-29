import React from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './Account/Login';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
  );
}

export default App;
