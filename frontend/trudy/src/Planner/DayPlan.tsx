import React, { useState } from "react";

function DayPlan(dayPlan: any) {
  const [selectedTab, setSelectedTab] = useState<number | null>(1);
  console.log('dayPlan       ', dayPlan)
  return (
    <div className="flex-col-10 absolute right-0">
      {dayPlan.dayPlan.map(
        (
          plan: {
            id: number,
            day: string,
            memo: string,
            dayItemList: any
          },
          i: number
        ) => {
          return (
            <div className="" key={i}>
              <nav className="">
                <ul className="list-none">
                  <li>
                    <input
                    type="button"
                      className={`font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                        selectedTab !== null &&
                        selectedTab === plan.id
                          ? "bg-trudy"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedTab(plan.id)
                      }
                      value={ plan.day }
                    >
                    </input>
                  </li>
                </ul>
              </nav>
              <div className="flex-grow">
                <div
                  className={`p-4 ${
                    selectedTab !== null &&
                    selectedTab === plan.id
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {plan
                    ? plan.id
                    : ""}
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default DayPlan;
