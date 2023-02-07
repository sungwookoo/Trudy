import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import DayPlan from "./DayPlan";
import SideBarPlanner from "./SideBarPlanner";
import TourPlan from "./TourPlan";

function Planner() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(
    () =>
      function isSignIn() {
        if (!authCtx.isLoggedIn) {
          alert("로그인 하세욧!");
          navigate("/signin");
        }
        // authCtx.planner(authCtx.userObj.id)
        authCtx.getUser({})
      },
    []
  );

  return (
    <div className="flex">
      <div>
        <SideBarPlanner></SideBarPlanner>
      </div>
      <div className="w-full h-full">
        <TourPlan></TourPlan>
        <div className="dayplan">
          <DayPlan></DayPlan>
        </div>
      </div>
    </div>
  );
}

export default Planner;
