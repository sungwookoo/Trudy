import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import SideBarPlanner from "./SideBarPlanner";
import TourPlanList from "./TourPlan";

function Planner() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState<number>(0)
  const [planner, setPlanner] = useState<[]>([])


  function IsSignIn() {
    if (authCtx.isLoggedIn) {
      // 멤버 Id 구하기, 더 좋은 방법 있을까?
      async function GetMemberId() {
      const res = await axios.get("/api/member/me", {        
        headers : {
        Authorization : 'bearer ' + localStorage.getItem("token")
      }}
      )
      const memberId = res.data.id
      setMemberId(memberId)
      }
      GetMemberId()
    } else {
      alert("로그인 하세욧!");
      navigate("/signin");
    }
  }
  IsSignIn()

  // 멤버 Id로 planner 정보 받아오기
  useEffect(() => {
    async function GetPlanner(){
      const data:any = await authCtx.planner(memberId)
      setPlanner(data.data)
    }
    GetPlanner()
  }, [memberId])


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
