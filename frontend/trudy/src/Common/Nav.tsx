import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import trudylogo from "../assets/trudylogo.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDropDown = () => {
    setIsOpen(!isOpen);
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

      {/* 로그인 했을 때 */}
      <div className="flex items-center md:order-2">
        <button
          type="button"
          data-dropdown-toggle="language-dropdown-menu"
          className="inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={openDropDown}
        >
          (프로필 사진 / 닉네임)
        </button>
        {isOpen ? (
          <div
            className=" bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
            id="language-dropdown-menu"
          >
            <ul className="py-2" role="none">
              <li>
                <div className="inline-flex items-center">계정 관리</div>
              </li>
              <li>
                <div className="inline-flex items-center">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="inline-flex items-center">메신저</div>
              </li>
              <li>
                <div className="inline-flex items-center">로그아웃</div>
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      {/* 프로필 */}
      <div className="nav-item">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </div>

      {/* 비로그인 상태일 때 */}
      {/* 로그인 */}
      <div className="nav-item">
        <NavLink className="nav-link" to="/signin">
          Sign In
        </NavLink>
      </div>

      {/* 회원가입 */}
      <div className="nav-item">
        <NavLink className="nav-link" to="/signupselect">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
