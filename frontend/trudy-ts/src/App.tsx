import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import TrudyMap from "./TrudyMap/TrudyMap";
import Profile from "./Profile/Profile";
import Nav from "./Common/Nav";
import SignIn from "./Account/SignIn";
import ProfileUpdateDefault from "./Profile/ProfileUpdate";

function App() {
  return (
    <div>
      {/* 네비게이션바 */}
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trudymap" element={<TrudyMap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/profileupdate" element={<ProfileUpdateDefault />} />
      </Routes>
    </div>
  );
}

export default App;
