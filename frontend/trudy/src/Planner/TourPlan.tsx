import { useState } from "react";
import DayPlan from "./DayPlan";

function TourPlanList(tourPlan:any) {
  const [selectedTour, setSelectedTour] = useState<number>(1)
  console.log(tourPlan)
  return (
    <div>
      {tourPlan.tourPlan.map(
        (plan : {
          plannerCombine : {
            plannerElement : {
              id: number,
              title: string,
              sequence: string
            }
          }
        },
          i:number
        ) => {
          return (
          <ul key={i}>
            <li className="-mb-px mr-1">
            <a
              className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
              onClick={() => setSelectedTour(i)}
            >
              {plan.plannerCombine.plannerElement.title}
            </a>
          </li>
          </ul>
          )
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
        <div className="dayplan">
          <DayPlan dayPlan={tourPlan}/>
        </div>
    </div>
  );
}

export default TourPlanList;
