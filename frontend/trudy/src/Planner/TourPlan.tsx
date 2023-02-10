import { useState } from "react";
import DayPlan from "./DayPlan";

function TourPlanList(tourPlan: any) {
  const [selectedTour, setSelectedTour] = useState<string | null>("1");
  return (
    <div>
      {tourPlan.tourPlan.map(
        (
          plan: {
            plannerCombine: {
              plannerElement: {
                id: number;
                title: string;
                sequence: string;
              };
            };
            dayCombine: any;
          },
          i: number
        ) => {
          return (
            <div>
              <ul key={i}>
                <li className="-mb-px mr-1">
                  <input
                    type="button"
                    className={`float-left bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer text-blue-700 font-semibold ${
                      selectedTour !== null &&
                      selectedTour ===
                        plan.plannerCombine.plannerElement.sequence
                        ? "bg-trudy"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedTour(
                        plan.plannerCombine.plannerElement.sequence
                      )
                    }
                    value={plan.plannerCombine.plannerElement.title}
                  ></input>
                </li>
              </ul>
              {selectedTour !== null &&
              selectedTour === plan.plannerCombine.plannerElement.sequence ? (
                <DayPlan dayPlan={plan.dayCombine.dayElementList} />
              ) : (
                ""
              )}
            </div>
          );
        }
      )}
      {/* <ul className="flex border-b">
        <li className="mr-1">
          <a
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            href="#"
          >
            Tab
          </a>
        </li>
      </ul> */}
      {/* <div className="dayplan">
        <DayPlan dayPlan={tourPlan} />
      </div> */}
    </div>
  );
}

export default TourPlanList;
