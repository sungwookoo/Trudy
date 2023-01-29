import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";

import Landing from './Landing/Landing';
import Map from './Map/Map';
import Forum from './Forum/Forum';
import Square from './Square/Square';
import Profile from './Profile/Profile';
import Planner from './Planner/Planner';
import Nav from './Common/Nav';


function App() {

    let [postInfo, setPostInfo] = useState([])
    useEffect(() => {
  
      axios.get("/api/posts/alldata").then((res) => {
        setPostInfo(res.data.postList);
      });
    }, []);

    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
            <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/map" element={<Map/>} />
              <Route path="/forum" element={<Forum postInfo={postInfo} setPostInfo={setPostInfo}/>} />
              <Route path="/square" element={<Square/>} />
              <Route path="/planner" element={<Planner/>} />
              <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>  
      </div>
    ); 
}


export default App;
