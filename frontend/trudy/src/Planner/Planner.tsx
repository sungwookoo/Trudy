import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Common/authContext";
import SideBarPlanner from "./SideBarPlanner";

const initialDragDataPlan = {
  target: null,
  index: -1,
  move_down: [],
  move_up: [],
  updateLists: [],
};

function Planner() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [plannerData, setPlannerData] = useState<any>(null);
  const [dayData, setDayData] = useState<[] | null>(null);
  const [dayItemData, setDayItemData] = useState<[] | null>(null);

  const [selectedPlanSequence, setSelectedPlanSequence] =
    useState<string>("10");
  const [selectedDaySequence, setSelectedDaySequence] = useState<string>("10");

  const [selectedPlanId, setSelectedPlanId] = useState<number>(0);
  const [selectedDayId, setSelectedDayId] = useState<number>(0);

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

  // const [isDragging, setIsDragging] = useState<boolean>(false);
  // const [lists, setLists] = useState(sortedPlan);
  // const [dragPlanData, setDragPlanData] = useState<any>(initialDragDataPlan);
  // const [dragDayData, setDragDayData] = useState<any>();
  // const [dragDayItemData, setDragDayItemData] = useState<any>();

  // // Drag & Drop
  // const _onDragOverPlan = (e: any) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   return true;
  // };
  // const _onDragStartPlan = (e: any) => {
  //   setIsDragging(true);
  //   setDragPlanData({
  //     ...dragPlanData,
  //     target: e.target,
  //     index: Number(e.target.dataset.index),
  //     updatePlanner: [...lists],
  //   });

  //   e.dataTransfer.setData("text/html", "");
  //   e.dataTransfer.effectAllowed = "move";
  // };
  // const _onDragEnterPlan = (e: any) => {
  //   const _dragged = Number(dragPlanData.target.dataset.index);
  //   const _index = Number(dragPlanData.index);
  //   const _target = Number(e.target.dataset.index);
  //   let move_down = [...dragPlanData.move_down];
  //   let move_up = [...dragPlanData.move_up];

  //   let data = [...dragPlanData.updateLists];
  //   data[_index] = data.splice(_target, 1, data[_index])[0];

  //   if (_dragged > _target) {
  //     move_down.includes(_target) ? move_down.pop() : move_down.push(_target);
  //   } else if (_dragged < _target) {
  //     move_up.includes(_target) ? move_up.pop() : move_up.push(_target);
  //   } else {
  //     move_down = [];
  //     move_up = [];
  //   }

  //   setDragPlanData({
  //     ...dragPlanData,
  //     updateLists: data,
  //     index: _target,
  //     move_up,
  //     move_down,
  //   });
  // };
  // const _onDragLeavePlan = (e: any) => {
  //   if (e.target === dragPlanData.target) {
  //     e.target.style.visibility = "hidden";
  //   }
  // };
  // const _onDragEndPlan = (e: any) => {
  //   setIsDragging(false);
  //   setPlannerData([...dragPlanData.updateLists]);

  //   setDragPlanData({
  //     ...dragPlanData,
  //     move_down: [],
  //     move_up: [],
  //     updateLists: [],
  //   });

  //   e.target.style.visibility = "visible";
  //   e.dataTransfer.dropEffect = "move";
  // };
  // const _onDropPlan = (e: any) => {};

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

        // 정렬
        const copyList = [...plannerData];
        const sortedList: any = copyList.sort(compareSequence);
        setSortedPlan(sortedList);
        if (sortedList[parseInt(selectedPlanSequence)]) {
          setDayData(
            sortedList[parseInt(selectedPlanSequence)].dayCombine.dayElementList
          );
          // sequence 재부여
          sortedList.map((plan: any, idx: number) =>
            authCtx.updatePlan(
              plan.plannerCombine.plannerElement.id,
              (idx + 1) * 10
            )
          );
        }
      };
      getSortedPlanList();
      setPlanNum(plannerData.length);
      // setSelectedPlanSequence((planNum * 10).toString());
    }
  }, [plannerData]);

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
        // 정렬
        const copyList = [...dayData];
        const sortedList: any = copyList.sort(compareSequence);
        setSortedDay(sortedList);
        // sequence 재부여
        sortedList.map((day: any, idx: number) => {
          authCtx.updateDay(day.id, (idx + 1) * 10);
          if (parseInt(selectedDaySequence) === (idx + 1) * 10) {
            setDayItemData(sortedList[idx].dayItemList);
          }
        });
      };
      getSortedDayList();
      setDayNum(dayData.length);
    } else {
      setDayItemData(null);
    }
  }, [selectedPlanSequence, dayData]);
  console.log('초기', selectedPlanSequence, selectedDaySequence)
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
        // sequence 재부여
        if (sortedList[0]) {
          sortedList.map((dayItem: any, idx: number) =>
            authCtx.updateDayItem(dayItem.id, (idx + 1) * 10)
          );
        }
      };
      getSortedDayItemList();
    }
  }, [selectedDaySequence, dayItemData, change]);

  // 모달창
  function Modal() {
    function yesButton() {
      if (modalClick === "plan") {
        authCtx.deletePlan(selectedPlanId);
      } else if (modalClick === "day") {
        authCtx.deleteDay(selectedDayId);
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
                  setChange(change+1)
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
        <div
          id="planner"
          className="flex bg-slate-300"
          // onDragOver={_onDragOverPlan}
          // onDrop={_onDropPlan}
        >
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
                  // let default_class = "";

                  // dragPlanData.move_down.includes(i) &&
                  //   (default_class = "move_down");

                  // dragPlanData.move_up.includes(i) &&
                  //   (default_class = "move_up");

                  return (
                    <div
                      className="float-left relative"
                      // ${isDragging && "transition: transform 200ms ease 0s"};
                      // user-select: none;
                      // touch-action: none;
                      // cursor: grab;

                      // i {
                      //   flex: 1;
                      // }

                      // p {
                      //   flex: 6;
                      // }

                      // &.move_up {
                      //   transform: translate(0, -65px);
                      //   z-index: 1;
                      // }

                      // &.move_down {
                      //   transform: translate(0, 65px);
                      //   z-index: 1;
                      // }

                      // & > * {
                      //   pointer-events: none;
                      // }`}
                      onMouseEnter={() =>
                        setHoverPlan(plan.plannerCombine.plannerElement.id)
                      }
                      onMouseLeave={() => setHoverPlan(null)}
                      key={i}
                      draggable
                      // onDragStart={_onDragStartPlan}
                      // onDragEnter={_onDragEnterPlan}
                      // onDragLeave={_onDragLeavePlan}
                      // onDragEnd={_onDragEndPlan}
                      // id={default_class}
                    >
                      <input
                        type="button"
                        className={`float-left inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer text-blue-700 font-semibold ${
                          selectedPlanSequence ===
                          plan.plannerCombine.plannerElement.sequence
                            ? "bg-trudy"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedPlanSequence(
                            plan.plannerCombine.plannerElement.sequence
                          );
                          setSelectedPlanId(
                            plan.plannerCombine.plannerElement.id
                          );
                          setDayData(plan.dayCombine.dayElementList);
                        }}
                        value={plan.plannerCombine.plannerElement.title}
                      ></input>
                      <input
                        type="button"
                        className={`font-bold absolute right-1 bottom-5 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                          hoverPlan === plan.plannerCombine.plannerElement.id
                            ? "block"
                            : "hidden"
                        }`}
                        value="x"
                        onClick={() => {
                          setSelectedPlanSequence(
                            plan.plannerCombine.plannerElement.sequence
                          );
                          setSelectedPlanId(
                            plan.plannerCombine.plannerElement.id
                          );
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
              authCtx.createPlan(((planNum + 1) * 10).toString());
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
                              selectedDaySequence === day.sequence
                                ? "bg-trudy"
                                : ""
                            }
                        `}
                            onClick={() => {
                              setSelectedDaySequence(day.sequence);
                              setSelectedDayId(day.id);
                              setDayItemData(day.dayItemList);
                            }}
                            value={day.day}
                          ></input>
                          <div className="flex">
                            <input
                              type="button"
                              className={`absolute font-bold block right-1 bottom-5 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                                hoverDay === day.id ? "block" : "hidden"
                              }`}
                              value="x"
                              onClick={() => {
                                setSelectedDaySequence(day.sequence);
                                setSelectedDayId(day.id);
                                setModal(true);
                                setModalClick("day");
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
                  selectedPlanId,
                  `day ${dayNum + 1}`,
                  "",
                  (dayNum + 1) * 10
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
                      <div
                        key={i}
                        className="relative bg-slate-600 p-2 border w-full"
                      >
                        <div className="flex p-4">
                          <input type="text" value={day.memo} placeholder="memo" />
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
