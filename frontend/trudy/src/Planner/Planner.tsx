import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import DayItemList from "./DayItem";
import SideBarPlanner from "./SideBarPlanner";
import TourPlanList from "./TourPlan";

function Planner() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [plannerData, setPlannerData] = useState<[]>([]);
  const [dayData, setDayData] = useState<[]>([]);

  const [selectedPlan, setSelectedPlan] = useState<number>(plannerData.length);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [sortedPlan, setSortedPlan] = useState<any>([]);
  const [sortedDay, setSortedDay] = useState<any>([]);
  const [hoverPlan, setHoverPlan] = useState<number | null>(null);
  const [hoverDay, setHoverDay] = useState<number | null>(null);
  // const [dayData, setDayData] = useState<[]>([])
  // const [dayItemData, setDayItemData] = useState<[]>([])

  function IsSignIn() {
    if (authCtx.isLoggedIn) {
    } else {
      alert("로그인 하세욧!");
      navigate("/signin");
    }
  }
  IsSignIn();
  IsSignIn();

  // 멤버 Id로 planner 정보 받아오기
  useEffect(() => {
    async function GetPlanner() {
      const data: any = await authCtx.planner();
      setPlannerData(data.data);
    }
    GetPlanner();
  }, []);

  // PlanList sequence 순 정렬
  useEffect(() => {
    const getSortedPlanList = () => {
      const compareSequence = (a: any, b: any) => {
        if (
          parseInt(a.plannerCombine.plannerElement["sequence"]) >
          parseInt(b.plannerCombine.plannerElement["sequence"])
        ) {
          return 1;
        } else {
          return -1;
        }
      };
      const copyList = [...plannerData];
      const sortedList = copyList.sort(compareSequence);
      setSortedPlan(sortedList);
    };
    getSortedPlanList();
  }, [plannerData]);

  // DayList sequence 순 정렬
  useEffect(() => {
    const getSortedDayList = () => {
      const compareSequence = (a: any, b: any) => {
        if (parseInt(a["sequence"]) > parseInt(b["sequence"])) {
          return 1;
        } else {
          return -1;
        }
      };
      const copyList = [...dayData];
      const sortedList = copyList.sort(compareSequence);
      setSortedDay(sortedList);
    };
    getSortedDayList();
    setSelectedDay(0)
  }, [selectedPlan]);

  return (
    <div className="flex">
      {/* 사이드바 */}
      <div>
        <SideBarPlanner></SideBarPlanner>
      </div>

      {/* Plan 내용 */}
      <div id="Content" className="w-full bg-slate-200">
        {/* Plan 목록 */}
        <div id="planner" className="flex bg-slate-300">
          {plannerData !== undefined
            ? sortedPlan.map(
                (
                  plan: {
                    plannerCombine: {
                      plannerElement: {
                        id: number;
                        title: string;
                        sequence: string;
                      };
                    };
                    dayCombine: {
                      dayElementList: any;
                    };
                  },
                  i: number
                ) => {
                  return (
                    <div
                      className="float-left relative"
                      onMouseEnter={() =>
                        setHoverPlan(plan.plannerCombine.plannerElement.id)
                      }
                      onMouseLeave={() => setHoverPlan(null)}
                      key={i}
                    >
                      <input
                        type="button"
                        className={`float-left inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer text-blue-700 font-semibold ${
                          selectedPlan === plan.plannerCombine.plannerElement.id
                            ? "bg-trudy"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedPlan(
                            plan.plannerCombine.plannerElement.id
                          );
                          // setDayData(plan.dayCombine.dayElementList)
                          setDayData(plan.dayCombine.dayElementList);
                        }}
                        value={plan.plannerCombine.plannerElement.title}
                      ></input>
                      <input
                        type="button"
                        className={`font-bold absolute right-1 bottom-5 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                          hoverPlan == plan.plannerCombine.plannerElement.id
                            ? "block"
                            : "hidden"
                        }`}
                        value="x"
                      ></input>
                    </div>
                  );
                }
              )
            : null}
        </div>

        {/* 선택된 Plan의 내용 */}
        <div id="planContent" className="h-full w-full">
          {/* 선택된 Plan의 DayList */}
          <div id="dayList" className="w-1/12 absolute right-0 bg-slate-400">
            {dayData !== undefined
              ? sortedDay.map(
                  (
                    day: {
                      id: number;
                      day: string;
                      memo: string;
                      dayItemList: any;
                      sequence: string;
                    },
                    i: number
                  ) => {
                    return (
                      <div key={i}>
                        <div
                          onMouseEnter={() => setHoverDay(day.id)}
                          onMouseLeave={() => setHoverDay(null)}
                          className="relative"
                        >
                          <input
                            type="button"
                            className={`font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                              selectedDay === day.id ? "bg-trudy" : ""
                            }
                        `}
                            onClick={() => setSelectedDay(day.id)}
                            value={day.day}
                          ></input>
                          <div className="flex">
                            <input
                              type="button"
                              className={`absolute font-bold block right-1 bottom-5 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                                hoverDay == day.id ? "block" : "hidden"
                              }`}
                              value="x"
                            ></input>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
              : null}
          </div>

          {/* 선택된 Day의 DayItemList */}
          <div id="dayItemList" className="w-11/12 bg-slate-500">
            dayitem
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;
