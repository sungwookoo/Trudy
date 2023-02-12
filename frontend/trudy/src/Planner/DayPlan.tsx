import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Common/authContext";

function DayPlan(dayPlan: any) {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [dayNum, setDayNum] = useState<number>(0);
  const [modal, setModal] = useState<number | null>(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (dayPlan.dayPlan[1] !== null) {
      setDayNum(dayPlan.dayPlan[1].length);
    }
  }, [dayPlan]);

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
      {dayPlan.dayPlan[1] !== null ? (
        dayPlan.dayPlan[1].map(
          (
            day: {
              id: number;
              day: string;
              memo: string;
              dayItemList: any;
            },
            i: number
          ) => {
            return (
              <div key={i}>
                <nav>
                  <ul className="list-none">
                    <li>
                      <input
                        type="button"
                        className={`font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                          selectedTab !== null && selectedTab === day.id
                            ? "bg-trudy"
                            : ""
                        }
                        `}
                        onClick={() => setSelectedTab(day.id)}
                        value={day.day}
                      ></input>
                    </li>
                  </ul>
                </nav>
                <div className="flex-grow">
                  <div className="flex">
                    <input
                      type="button"
                      className="font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900"
                      onClick={() => setModal(day.id)}
                      value="x"
                    ></input>
                  </div>
                  {modal && modal === day.id ? <Modal /> : null}

                  <div
                    className={`p-4 ${
                      selectedTab !== null && selectedTab === day.id
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {day ? day.day : ""}
                  </div>
                </div>
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
          authCtx.createDay(dayPlan.dayPlan[0], `day ${dayNum + 1}`, "");
        }}
        value="+"
      ></input>
    </div>
  );
}

export default DayPlan;
