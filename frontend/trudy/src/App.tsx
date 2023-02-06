import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import TrudyMap from "./TrudyMap/TrudyMap";
import Square from "./Square/Square";
import Planner from "./Planner/Planner";
import MyProfile from "./Profile/MyProfile";
import ProfileUpdate from "./Profile/ProfileUpdate";
import SignIn from "./Account/SignIn";
import SignUp from "./Account/SignUp";
import SignUpSelect from "./Account/SignUpSelect";
import ForumPage from "./Forum/Forum";
import Nav from "./Common/Nav";
import ForumCreate from "./Forum/ForumCreate";


function App() {

  // Code to handle form submission
  const writeArticle = (event: React.FormEvent<HTMLFormElement>) => {
  };

  return (
    <div>
      {/* 네비게이션바 */}
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trudymap" element={<TrudyMap />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forumcreate" element={<ForumCreate />} />
        <Route path="/square" element={<Square />} /> 
        <Route path="/planner" element={<Planner />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupselect" element={<SignUpSelect />} />
      </Routes>
    </div>
  );
}

export default App;
