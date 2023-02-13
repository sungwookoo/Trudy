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

  const [plannerData, setPlannerData] = useState<[] | null>(null);
  const [dayData, setDayData] = useState<[] | null>(null);
  const [dayItemData, setDayItemData] = useState<[] | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const [planNum, setPlanNum] = useState<number>(0);
  const [dayNum, setDayNum] = useState<number>(0);

  const [sortedPlan, setSortedPlan] = useState<any>([]);
  const [sortedDay, setSortedDay] = useState<any>([]);
  const [sortedDayItem, setSortedDayItem] = useState<any>([]);

  const [change, setChange] = useState<number>(0);

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

  // 멤버 Id로 planner 정보 받아오기
  useEffect(() => {
    async function GetPlanner() {
      const data: any = await authCtx.planner();
      setPlannerData(data.data);
    }
    GetPlanner();
    console.log("실행");
  }, [change]);

  // PlanList sequence 순 정렬
  useEffect(() => {
    if (plannerData !== null) {
      const getSortedPlanList = () => {
        const compareSequence = (a: any, b: any) => {
          if (
            parseInt(a.plannerCombine.plannerElement["sequence"]) >
            parseInt(b.plannerCombine.plannerElement["sequence"])
          ) {
            return -1;
          } else {
            return 1;
          }
        };
        const copyList = [...plannerData];
        const sortedList: any = copyList.sort(compareSequence);
        setSortedPlan(sortedList);
        if (sortedList[0]) {
          setSelectedPlan(sortedList[0].plannerCombine.plannerElement.id);
          setDayData(sortedList[0].dayCombine.dayElementList);
        }
      };
      getSortedPlanList();
      setPlanNum(plannerData.length);
    }
  }, [plannerData, change]);

  // DayList sequence 순 정렬
  useEffect(() => {
    if (dayData !== null) {
      const getSortedDayList = () => {
        const compareSequence = (a: any, b: any) => {
          if (parseInt(a["sequence"]) > parseInt(b["sequence"])) {
            return -1;
          } else {
            return 1;
          }
        };
        const copyList = [...dayData];
        const sortedList: any = copyList.sort(compareSequence);
        setSortedDay(sortedList);
        if (sortedList[0]) {
          setSelectedDay(sortedList[0].id);
          setDayItemData(sortedList[0].dayItemList);
        }
      };
      getSortedDayList();
      setDayNum(dayData.length);
    }
  }, [selectedPlan, plannerData, change]);

  // DayItem sequence 순 정렬
  useEffect(() => {
    if (dayItemData !== null) {
      const getSortedDayItemList = () => {
        const compareSequence = (a: any, b: any) => {
          if (parseInt(a["sequence"]) > parseInt(b["sequence"])) {
            return -1;
          } else {
            return 1;
          }
        };
        const copyList = [...dayItemData];
        const sortedList: any = copyList.sort(compareSequence);
        setSortedDayItem(sortedList);
      };
      getSortedDayItemList();
    }
  }, [selectedDay, plannerData, change]);

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
          {plannerData !== null
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
                        onClick={() => {
                          authCtx.deletePlan(
                            hoverPlan
                          );
                          setChange(change + 1);
                        }}
                      ></input>
                    </div>
                  );
                }
              )
            : null}
          <input
            type="button"
            className="float-left inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer text-blue-700 font-semibold"
            onClick={() => {
              authCtx.createPlan(authCtx.loggedInfo.uid, planNum + 1);
              setChange(change + 1);
            }}
            value="+"
          ></input>
        </div>

        {/* 선택된 Plan의 내용 */}
        <div id="planContent" className="h-full w-full relative">
          {/* 선택된 Plan의 DayList */}
          <div id="dayList" className="w-1/12 absolute right-0 bg-slate-400">
            {dayData !== null
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
            <input
              type="button"
              className="float-left inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer text-blue-700 font-semibold"
              onClick={() => {
                authCtx.createDay(
                  selectedPlan,
                  `day ${dayNum + 1}`,
                  "",
                  dayNum + 1
                );
                setChange(change + 1);
              }}
              value="+"
            ></input>
          </div>

          {/* 선택된 Day의 DayItemList */}
          <div id="dayItemList" className="w-11/12 bg-slate-500">
            {dayItemData !== null
              ? sortedDayItem.map(
                  (
                    day: {
                      id: number;
                      customTitle: string;
                      customImage: string;
                      memo: string;
                      sequence: string;
                    },
                    i: number
                  ) => {
                    return (
                      <div key={i} className="bg-slate-600 p-2 border w-full">
                        <div className="flex p-4">
                          <input type="text" value={day.memo} />
                        </div>
                      </div>
                    );
                  }
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;
