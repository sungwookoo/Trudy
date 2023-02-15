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
  const openDropDown = () => {
    setIsOpen(!isOpen);
  };
  const token = "bearer " + localStorage.getItem("token");

  // const navigateToProfile = useNavigate()
  // navigateToProfile('/profile')
  const navproImg = navProfileImg;
  const authCtx = useContext(AuthContext);
  const signOut = () => {
    authCtx.signOut();
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
  //       console.log(profile, "정보");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getprofile();
  // }, []);

  // 이하 HTML

  return (
    // 네비게이션바
    <nav className="nav-bar">
      <div className="all-fuctions">
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
        <div className="nav-item">
          <NavLink className="nav-link" to="/trudymap">
            Map
          </NavLink>
        </div>

        {/* 포럼 */}
        <div className="nav-item">
          <NavLink className="nav-link" to="/forum">
            Forum
          </NavLink>
        </div>

        {/* 스퀘어 */}
        <div className="nav-item">
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
            <div className="nav-item pr-8">
              <NavLink className="nav-link" to="/signin">
                Sign In
              </NavLink>
            </div>
            <div className="nav-item mr-22">
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
                <div className="chat-nav-item absolute z-50 bottom-0 right-0"></div>
              </NavLink>
            </div>
            <div className="nav-item flex flex-row items-center">
              <NavImage />
              {/* <img
                className="nav-profile-img mr-12"
                src={navproImg}
                alt="navProfileImage"
              /> */}
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </div>
            <div className="nav-item">
              <button className="nav-link ml-1 mr-12" onClick={signOut}>
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
