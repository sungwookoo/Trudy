import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import NewLogo from "../assets/NewLogo.png";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDropDown = () => {
    setIsOpen(!isOpen);
  };

  // const navigateToProfile = useNavigate()
  // navigateToProfile('/profile')

  const authCtx = useContext(AuthContext);
  const signOut = () => {
    authCtx.signOut();
  };

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
            <div className="nav-item mx-6">
              <NavLink className="nav-link" to="/signin">
                Sign In
              </NavLink>
            </div>
            <div className="nav-item mx-6">
              <NavLink className="nav-link" to="/signupselect">
                Sign Up
              </NavLink>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="nav-item flex flex-row items-center">
              <img
                className="nav-profile-img mr-12"
                src="https://blog.kakaocdn.net/dn/FSvHG/btrzdoAbEI0/WA1kfeo9BFC8n8GOe39U31/img.webp"
                alt="navProfileImage"
              />
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </div>
            <div className="nav-item">
              <button className="nav-link ml-4 mr-12" onClick={signOut}>
                SignOut
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
