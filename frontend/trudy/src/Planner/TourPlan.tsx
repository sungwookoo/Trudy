import { useContext, useEffect, useState } from "react";
import AuthContext from "../Common/authContext";
import DayPlan from "./DayPlan";

function TourPlanList(tourPlan: any) {
  const [selectedTour, setSelectedTour] = useState<string | null>("1");
  const [planNum, setPlanNum] = useState<number>(1);
  const authCtx = useContext(AuthContext);
  console.log('tourPlan', tourPlan)
  useEffect(() => {
    setPlanNum(tourPlan.tourPlan.length);
  }, [tourPlan]);

  return (
    <div>
      {tourPlan.tourPlan !== null ? tourPlan.tourPlan.map(
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
            <div className="h-full">
              <ul className="" key={i}>
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
              <div id="dayplan" className="flex flex-col">
                {selectedTour !== null &&
                selectedTour === plan.plannerCombine.plannerElement.sequence ? (
                  <DayPlan dayPlan={[plan.plannerCombine.plannerElement.id, plan.dayCombine.dayElementList]} />
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        }
      ) : <></>}
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
      <input
        type="button"
        className="float-left bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer text-blue-700 font-semibold"
        onClick={() =>
          authCtx.createPlan(parseInt(authCtx.loggedInfo.uid), planNum + 1)
        }
        value="+"
      ></input>
    </div>
  );
}

export default TourPlanList;
