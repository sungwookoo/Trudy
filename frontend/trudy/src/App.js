import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
