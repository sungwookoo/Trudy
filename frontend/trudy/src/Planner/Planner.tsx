import React from "react";
import DayPlan from "./DayPlan";
import SideBarPlanner from "./SideBarPlanner";
import TourPlan from "./TourPlan";

function Planner() {
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
