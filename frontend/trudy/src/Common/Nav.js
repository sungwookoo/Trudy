import React from "react";
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css'

const Nav= (props) => {
  return (
    <nav>
      <div>
        <NavLink to='/'>
          Trudy
        </NavLink>
      </div>
      {/* <div>
        <NavLink to='/map'>
          Map
        </NavLink>
      </div>
      <div>
        <NavLink to='/forum'>
          Forum
        </NavLink>
      </div>
      <div>
        <NavLink to='/square'>
          Square
        </NavLink>
      </div>
      <div>
        <NavLink to='/planner'>
          Planner
        </NavLink>
      </div> */}
      <div>
        <NavLink to='/profile'>
          Profile
        </NavLink>
      </div>








    </nav>
  )
}

export default Nav;