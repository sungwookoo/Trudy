import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Common/authContext";
import DayItemList from "./DayItem";

function DayPlan(tourPlan: any) {
  const [sortedPlan, setSortedPlan] = useState<any>(tourPlan.tourPlan[1]);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [dayNum, setDayNum] = useState<number>(0);
  const [modal, setModal] = useState<number | null>(null);
  const [hover, setHover] = useState<string>("");

  const authCtx = useContext(AuthContext);

  const getSortedList = () => {
    const compare = (a: any, b: any) => {
      if (parseInt(a["sequence"]) > parseInt(b["sequence"])) {
        return 1;
      } else {
        return -1;
      }
    };
    const copyList = tourPlan.tourPlan[1];
    const sortedList = copyList.sort(compare);
    setSortedPlan(sortedList);
  };

  useEffect(() => {
    if (tourPlan.tourPlan[1] !== undefined) {
      setDayNum(tourPlan.tourPlan[1].length);
    }
  }, [tourPlan]);

  function Modal() {
    return (
      <div className="absolute flex justify-center">
        <h3>진짜 삭제?</h3>
        <input
          type="button"
          className="cursor-pointer border"
          value="예"
          onClick={() => authCtx.deleteDay(modal)}
        ></input>
        <input
          type="button"
          className="cursor-pointer border"
          value="아니오"
          onClick={() => setModal(null)}
        ></input>
      </div>
    );
  }

  return (
    <div className="flex-col-10 absolute right-0">
      {tourPlan.tourPlan[1] !== undefined ? (
        sortedPlan.map(
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
                <div id="여기" className="flex">
                  <input
                    type="button"
                    className={`font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                      hover == day.sequence ? "block" : "hidden"
                    }`}
                    onClick={() => setModal(day.id)}
                    value="x"
                  ></input>
                  {/* {selectedTab && selectedTab === day.sequence ? ( */}
                  <div
                    id="DayItemList"
                    className="flex  h-5 w-5  absolute bg-black"
                  >
                    <DayItemList dayPlan={[day.id, day.dayItemList]} />
                  </div>
                  {/* ) : null} */}
                </div>
                {modal && modal === day.id ? <Modal /> : null}
                <nav>
                  <ul className="list-none">
                    <li>
                      <div
                        onMouseEnter={() => setHover(day.sequence)}
                        onMouseLeave={() => setHover("")}
                      >
                        <input
                          type="button"
                          className={`font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                            selectedTab !== null && selectedTab === day.sequence
                              ? "bg-trudy"
                              : ""
                          }
                        `}
                          onClick={() => setSelectedTab(day.sequence)}
                          value={day.day}
                        ></input>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            );
          }
        )
      ) : (
        <></>
      )}
      <input
        type="button"
        className="font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900"
        onClick={() => {
          // authCtx.createDay(tourPlan.tourPlan[0], `day ${dayNum + 1}`, "");
        }}
        value="+"
      ></input>
    </div>
  );
}

export default DayPlan;
