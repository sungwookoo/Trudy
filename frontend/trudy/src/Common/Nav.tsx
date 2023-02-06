import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import trudylogo from "../assets/trudylogo.png";
import AuthContext from "./authContext";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDropDown = () => {
    setIsOpen(!isOpen);
  };

  const authCtx = useContext(AuthContext);
  const signOut = () => {
    authCtx.signOut();
    if (authCtx.isLoggedIn === false) {
      alert("sign out!");
    }
  };

  return (
    // 네비게이션바
    <nav className="nav-bar">
      <NavLink to="/">
        <img className="nav-logo" src={trudylogo} alt="TrudyLogo"></img>
      </NavLink>

      {/* 랜딩페이지 */}
      <div className="nav-item-logo">
        <NavLink className="nav-link" to="/">
          Trudy
        </NavLink>
      </div>

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

      {/* 프로필 */}

      {/* 로그인 */}
      {!authCtx.isLoggedIn ? (
        <>
          <div className="nav-item">
            <NavLink className="nav-link" to="/signin">
              Sign In
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className="nav-link" to="/signupselect">
              Sign Up
            </NavLink>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
