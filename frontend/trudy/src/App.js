import React from "react";
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Scroll from './Landing/Scroll';
import Profile from './Profile/Profile';
import Nav from './Common/Nav';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // 요청받은 정보를 담아줄 변수 선언
  const [testStr, setTestStr] = useState("");
  const [test2api, setTestStr2] = useState("");

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }

  function callback2(str) {
    setTestStr2(str);
  }

  // 첫 번째 렌더링을 마친 후 실행
  useEffect(() => {
    axios
      .get("/api/test")
      .then((Response) => {
        callback(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/test2")
      .then((Response) => {
        callback2(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  // 위로 예시

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
