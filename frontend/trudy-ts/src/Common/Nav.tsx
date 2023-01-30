import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import trudylogo from "../Assets/trudylogo.png";

const Nav = () => {
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
      <div className="nav-item">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </div>
      {/* 로그인 */}
      <div className="nav-item">
        <NavLink className="nav-link" to="/signIn">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
