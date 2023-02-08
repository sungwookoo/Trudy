import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ForumDetail from "./Forum/ForumDetail";
import AuthContext from "./Common/authContext";
import axios from "axios";
import * as authAction from "./Common/authAction";
import * as axiosInterceptor from "./Common/axiosInterceptor";
import EmailConfirm from "./Account/EmailConfirm";

function App() {
  // Code to handle form submission
  const writeArticle = (event: React.FormEvent<HTMLFormElement>) => {};
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   const refreshToken = localStorage.getItem("refreshToken")
  //   try {
  //     axiosInterceptor.axiosRefresh
  //       .post("/api/reissuance", {
  //         accessToken: token,
  //         refreshToken: refreshToken
  //       })
  //       .then((res) => {
  //         console.log('성공')
  //         localStorage.setItem("token", res.data.accessToken);
  //         localStorage.setItem("refreshToken", res.data.refreshToken);
  //         localStorage.setItem("expirationTime", String(res.data.expirationTime));
  //       })
  //   } catch (e) {
  //   }
  // }, []);

  return (
    <div>
      {/* 네비게이션바 */}
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trudymap" element={<TrudyMap />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:id" element={<ForumDetail />} />
        <Route path="/forumcreate" element={<ForumCreate />} />
        <Route path="/square" element={<Square />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/square" element={<Square />} />
        <Route
          path="/planner"
          element={authCtx.isLoggedIn ? <Planner /> : <SignIn />}
          // element={<Planner />}
        />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
        <Route
          path="/signin"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/emailconfirm"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <EmailConfirm />}
        />

        {/* 로그인한 상태면 랜딩페이지로 */}
        {/* 로그인 안했는데 이메일 인증 안했으면 이메일 인증 페이지로 */}
        {/* 로그인 안했는데 이메일 인증은 했으면 회원가입 페이지로 */}
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
