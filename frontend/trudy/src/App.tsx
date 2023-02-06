import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Landing/Landing";
import TrudyMap from "./TrudyMap/TrudyMap";
import Square from "./Square/Square";
import Planner from "./Planner/Planner";
import Profile from "./Profile/Profile";
import ProfileUpdate from "./Profile/ProfileUpdate";
import SignIn from "./Account/SignIn";
import SignUp from "./Account/SignUp";
import SignUpSelect from "./Account/SignUpSelect";
import ForumPage from "./Forum/Forum";
import Nav from "./Common/Nav";
import ForumCreate from "./Forum/ForumCreate";
import AuthContext from "./Common/authContext";

function App() {
  // Code to handle form submission
  const writeArticle = (event: React.FormEvent<HTMLFormElement>) => {};
  const authCtx = useContext(AuthContext);

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
        <Route
          path="/planner"
          // element={authCtx.isLoggedIn ? <Planner /> : <SignIn />}
          element={<Planner />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
        <Route
          path="/signin"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signupselect"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUpSelect />}
        />
      </Routes>
    </div>
  );
}

export default App;
