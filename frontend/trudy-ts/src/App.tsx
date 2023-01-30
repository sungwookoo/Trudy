import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import TrudyMap from "./TrudyMap/TrudyMap";
import Profile from "./Profile/Profile";
import Nav from "./Common/Nav";
import ProfileUpdateDefault from "./Profile/ProfileUpdate";
import SignIn from "./Account/SignIn";
import SignUpSelect from "./Account/SignUpSelect";

function App() {
  return (
    <div>
      {/* 네비게이션바 */}
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trudymap" element={<TrudyMap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileupdate" element={<ProfileUpdateDefault />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUpSelect" element={<SignUpSelect />} />
      </Routes>
    </div>
  );
}

export default App;
