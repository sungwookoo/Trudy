import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import SideBarPlanner from "./SideBarPlanner";

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

  const [modal, setModal] = useState<boolean>(false);
  const [modalClick, setModalClick] = useState<string>("");
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
            return 1;
          } else {
            return -1;
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
            return 1;
          } else {
            return -1;
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
            return 1;
          } else {
            return -1;
          }
        };
        const copyList = [...dayItemData];
        const sortedList: any = copyList.sort(compareSequence);
        setSortedDayItem(sortedList);
      };
      getSortedDayItemList();
    }
  }, [selectedDay, plannerData, change]);

  // 모달창
  function Modal() {
    function yesButton() {
      if (modalClick == "plan") {
        authCtx.deletePlan(selectedPlan);
      } else if (modalClick == "day") {
        authCtx.deleteDay(selectedDay);
      }
    }

    return (
      <div
        id="popup-modal"
        className={`z-50 fixed top-1/2 right-1/2 translate-x-1/2  -translate-y-1/2 ${
          modal ? "block" : "hidden"
        }`}
        onClick={() => {
          setModal(false);
        }}
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  yesButton();
                }}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  setModal(false);
                }}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div>
        <Modal />
      </div>

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
                          setModal(true);
                          setModalClick("plan");
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
                              onClick={() => {
                                setModal(true);
                                setModalClick("day");
                                setChange(change + 1);
                              }}
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
