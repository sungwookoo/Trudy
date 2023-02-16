import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import NewLogo from "../assets/NewLogo.png";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavImage from "./NavImage";
import ChatRoom from "../Chat/ChatRoom";

function Nav(navProfileImg: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [selectedNav, setSelectedNav] = useState<any>(window.location.href);

  const openDropDown = () => {
    setIsOpen(!isOpen);
  };
  const token = "bearer " + localStorage.getItem("token");
  const navigate = useNavigate();
  function navigateToProfile() {
    setSelectedNav("/profile");
    navigate("/profile");
  }
  const navproImg = navProfileImg;
  const authCtx = useContext(AuthContext);
  const signOut = () => {
    authCtx.signOut();
  };

  const handelClickNav = (e: any) => {
    setSelectedNav(e.target.pathname);
  };

  // useEffect(() => {
  //   const getprofile = async () => {
  //     try {
  //       const response = await axios.get("api/member/me", {
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       setProfile(response.data);
  //     } catch (error) {
  //     }
  //   };
  //   getprofile();
  // }, []);

  // 이하 HTML

  return (
    // 네비게이션바
    <nav className="nav-bar">
      <div
        className="all-fuctions"
        onClick={(e) => {
          handelClickNav(e);
        }}
      >
        <NavLink to="/">
          <img className="nav-logo" src={NewLogo} alt="TrudyLogo"></img>
        </NavLink>

        {/* 랜딩페이지 */}
        {/* <div className="nav-item-logo">
        <NavLink className="nav-link" to="/">
          Trudy
        </NavLink>
      </div> */}

        {/* 지도 */}
        <div
          className={`${
            selectedNav === "/trudymap" ? "nav-item-select" : "nav-item"
          }`}
          onClick={(e) => {
            handelClickNav(e);
          }}
        >
          <NavLink className="ml-4 nav-link" to="/trudymap">
            Map
          </NavLink>
        </div>

        {/* 포럼 */}
        <div
          className={`${
            selectedNav === "/forum" ? "nav-item-select" : "nav-item"
          }`}
          onClick={(e) => {
            handelClickNav(e);
          }}
        >
          <NavLink className="nav-link" to="/forum">
            Forum
          </NavLink>
        </div>

        {/* 스퀘어 */}
        <div
          className={`${
            selectedNav === "/square" ? "nav-item-select" : "nav-item"
          }`}
          onClick={(e) => {
            handelClickNav(e);
          }}
        >
          <NavLink className="nav-link" to="/square">
            Square
          </NavLink>
        </div>

        {/* 플래너 */}
        <div className="nav-item">
          <NavLink className="nav-link" to="/planner">
            Planner
          </NavLink>
        </div>
      </div>

      <div className="profile-signout">
        {/* 프로필 */}

        {/* 로그인 */}
        {!authCtx.isLoggedIn ? (
          <>
            <div
              className={`${
                selectedNav === "/signin" ? "nav-item-select" : "nav-item"
              }`}
              onClick={(e) => {
                handelClickNav(e);
              }}
            >
              <NavLink className="nav-link" to="/signin">
                Sign In
              </NavLink>
            </div>
            <div
              className={`${
                selectedNav === "/signupselect" ? "nav-item-select" : "nav-item"
              }`}
              onClick={(e) => {
                handelClickNav(e);
              }}
            >
              <NavLink className="nav-link" to="/signupselect">
                Sign Up
              </NavLink>
            </div>{" "}
          </>
        ) : (
          <>
            {/* 채팅화면으로 전환 */}
            <div>
              <NavLink id="chat-nav-link" to="/chatroom">
                <div className="chat-nav-item fixed z-50 bottom-0 right-0"></div>
              </NavLink>
            </div>
            <div
              className="nav-item flex flex-row items-center cursor-pointer"
              onClick={navigateToProfile}
            >
              <NavImage />
              {/* <img
                className="nav-profile-img mr-12"
                src={navproImg}
                alt="navProfileImage"
              /> */}
              <NavLink
                className={`${
                  selectedNav === "/profile" ? "nav-item-select" : "nav-item"
                }`}
                onClick={(e) => {
                  handelClickNav(e);
                }}
                to="/profile"
              >
                Profile
              </NavLink>
            </div>
            <div>
              <NavLink
                className={`${
                  selectedNav === "/accountsetting"
                    ? "nav-item-select"
                    : "nav-item"
                }`}
                onClick={(e) => {
                  handelClickNav(e);
                }}
                to="/accountsetting"
              >
                {/* <NavLink className="nav-item" to="/accountedit"> */}
                Account
              </NavLink>
            </div>
            <div className="nav-item">
              <button className="nav-link mr-3" onClick={signOut}>
                SignOut
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
