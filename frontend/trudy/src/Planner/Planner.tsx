import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import SideBarPlanner from "./SideBarPlanner";
import TourPlanList from "./TourPlan";

function Planner() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [planner, setPlanner] = useState<[]>([])


  function IsSignIn() {
    if (authCtx.isLoggedIn) {
    } else {
      alert("로그인 하세욧!");
      navigate("/signin");
    }
  }
  IsSignIn()

  // 멤버 Id로 planner 정보 받아오기
  useEffect(() => {
    async function GetPlanner(){
      const data:any = await authCtx.planner()
      setPlanner(data.data)
    }
    GetPlanner()
  }, [TourPlanList])


  return (
    <div className="flex">
      <div>
        <SideBarPlanner></SideBarPlanner>
      </div>
      <div className="w-full h-full">
        <TourPlanList tourPlan={planner} />
      </div>
    </div>
  );
}

export default Planner;
