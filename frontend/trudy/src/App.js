import React from "react";
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Scroll from './Landing/Scroll';
import Profile from './Profile/Profile';
import Nav from './Common/Nav';

function App() {
    return (
      <div className="App">
        <BrowserRouter>
        <Nav />
          <Routes>
            <Route exact path="/" component={Scroll} />
            <Route path="/profile" component={Profile} />
          </Routes>
          <Scroll />
          <Profile />
        </BrowserRouter>  
      </div>
    );
  };


export default App;
