import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Common/Nav";
import Landing from "./Landing/Landing";
import TrudyMap from "./TrudyMap/TrudyMap";
import Square from "./Square/Square";
import Planner from "./Planner/Planner";
import Profile from "./Profile/Profile";
import ProfileUpdate from "./Profile/ProfileUpdate"
import SignIn from "./Account/SignIn";
import SignUp from "./Account/SignUp";
import SignUpSelect from "./Account/SignUpSelect";

function App() {
  return (
    <div>
      {/* 네비게이션바 */}
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trudymap" element={<TrudyMap />} />
        <Route path="/square" element={<Square />} /> 
        <Route path="/planner" element={<Planner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupselect" element={<SignUpSelect />} />
      </Routes>
    </div>
  );
}

export default App;
