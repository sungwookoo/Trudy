import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Landing/Landing";
import TrudyMap from "./TrudyMap/TrudyMap";
import Square from "./Square/Square";
import Planner from "./Planner/Planner";
import MyProfile from "./Profile/MyProfile";
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
import UserProfile from "./Profile/UserProfile";
import ProfileEdit from "./Profile/ProfileEdit";
import ForumPostEdit from "./Forum/ForumPostEdit";
import ChatRoom from "./Chat/ChatRoom";
import "./App.css";
import AccountEdit from "./Account/AccountEdit";
import PasswordChange from "./Account/PasswordChange";
import AccountSetting from "./Account/AccountSetting";

function App() {
  // Code to handle form submission
  const writeArticle = (event: React.FormEvent<HTMLFormElement>) => {};
  const authCtx = useContext(AuthContext);
  // const [profileImage, setProfileImage] = useState(null);
  // const token = "bearer " + localStorage.getItem("token");
  // const [map, setMap] = useState(true);
  // useEffect(() => {
  //   console.log("토큰", localStorage.getItem("token"));
  //   if (localStorage.getItem("token") === null) {
  //     setMap(false);
  //   }
  // }, [localStorage.getItem("token")]);

  // useEffect(() => {
  //   const fetchProfileImage = async () => {
  //     try {
  //       const response = await axios.get("api/member/me", {
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       setProfileImage(response.data.image);
  //       console.log(profileImage, "정보");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchProfileImage();
  // }, [token]);

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
        <Route id="nav-item" path="/trudymap" element={<TrudyMap />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/post/:id" element={<ForumDetail />} />
        <Route
          path="/forumcreate"
          element={authCtx.isLoggedIn ? <ForumCreate /> : <SignIn />}
        />
        <Route
          path="/post/update/:id"
          element={authCtx.isLoggedIn ? <ForumPostEdit /> : <SignIn />}
        />
        <Route path="/square" element={<Square />} />
        <Route
          path="/profile/:id"
          element={authCtx.isLoggedIn ? <UserProfile /> : <SignIn />}
        />
        <Route
          path="/profile"
          element={authCtx.isLoggedIn ? <MyProfile /> : <SignIn />}
        />
        <Route path="/square" element={<Square />} />
        <Route
          path="/planner"
          element={authCtx.isLoggedIn ? <Planner /> : <SignIn />}
          // element={<Planner />}
        />
        <Route
          path="/profileedit"
          element={authCtx.isLoggedIn ? <ProfileEdit /> : <SignIn />}
        />
        <Route
          path="/signin"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/emailconfirm"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <EmailConfirm />}
        />
        <Route
          path="/accountsetting"
          element={authCtx.isLoggedIn ? <AccountSetting /> : <SignIn />}
        />
        <Route
          path="/passwordchange"
          element={authCtx.isLoggedIn ? <PasswordChange /> : <SignIn />}
        />
        <Route
          path="/accountedit"
          element={authCtx.isLoggedIn ? <AccountEdit /> : <SignIn />}
        />
        {/* 로그인한 상태면 랜딩페이지로 */}
        {/* 로그인 안했는데 이메일 인증 안했으면 이메일 인증 페이지로 */}
        {/* 로그인 안했는데 이메일 인증은 했으면 회원가입 페이지로 */}
        <Route
          path="/signup"
          element={
            authCtx.isLoggedIn ? (
              <Navigate to="/" />
            ) : authCtx.isVerified ? (
              <SignUp />
            ) : (
              <SignUpSelect />
            )
          }
        />
        {/* <Route
          path="/signup"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        /> */}
        <Route
          path="/signupselect"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUpSelect />}
        />
        <Route
          path="/chatroom"
          element={authCtx.isLoggedIn ? <ChatRoom /> : <SignIn />}
        />
      </Routes>
    </div>
  );
}

export default App;
