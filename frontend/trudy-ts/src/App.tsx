import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import './App.css';
import Landing from './Landing/Landing';
import TrudyMap from './TrudyMap/TrudyMap';
import Profile from './Profile/Profile';
import Nav from './Common/Nav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/trudymap' element={<TrudyMap />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
