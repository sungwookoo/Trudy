import { useContext, useEffect, useState } from "react";
import AuthContext from "../Common/authContext";
import DayPlan from "./DayPlan";

function TourPlanList(planner: any) {
  const [sortedPlan, setSortedPlan] = useState<any>(planner.planner)
  const [selectedTour, setSelectedTour] = useState<string | null>("1");
  const [planNum, setPlanNum] = useState<number>(1);
  const [modal, setModal] = useState<number | null>(null);
  const [hover, setHover] = useState<string>("");

  const authCtx = useContext(AuthContext);

  const getSortedList = () => {
    const compare = (a: any, b: any) => {
      if (parseInt(a['sequence']) > parseInt(b['sequence'])) {
        return 1
      } else {
        return -1
      }
    }
    const copyList = planner.planner.plannerCombine.plannerElement
    const sortedList = copyList.sort(compare)
    setSortedPlan(sortedList)
  }
  console.log(planner.planner)
  useEffect(() => {
    setPlanNum(planner.planner.length);
  }, [planner]);

  function Modal() {
    return (
      <div className="absolute flex justify-center">
        <h3>진짜 삭제?</h3>
        <input
          type="button"
          className="cursor-pointer border"
          value="예"
          onClick={() => {
            authCtx.deleteDay(modal);
            setModal(null);
          }}
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
    <div>
      {planner.planner !== undefined ? (
        planner.planner.map(
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
              <div className="h-full" id="여기?" key={i}>
                <ul className="">
                  <li className="-mb-px mr-1">
                    <div
                      className="float-left"
                      onMouseEnter={() =>
                        setHover(plan.plannerCombine.plannerElement.sequence)
                      }
                      onMouseLeave={() => setHover("")}
                    >
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
                      <input
                        type="button"
                        className={`font-bold block px-4 py-2 text-left text-gray-700 rounded-t cursor-pointer hover:text-gray-900 ${
                          hover == plan.plannerCombine.plannerElement.sequence
                            ? "block"
                            : "hidden"
                        }`}
                        onClick={() =>
                          setModal(plan.plannerCombine.plannerElement.id)
                        }
                        value="x"
                      ></input>
                      {modal &&
                      modal === plan.plannerCombine.plannerElement.id ? (
                        <Modal />
                      ) : null}
                    </div>
                  </li>
                </ul>
                <div>
                  {selectedTour !== null &&
                  selectedTour ===
                    plan.plannerCombine.plannerElement.sequence ? (
                    <div id="dayplan" className="flex flex-col">
                      <DayPlan
                        tourPlan={[
                          plan.plannerCombine.plannerElement.id,
                          plan.dayCombine.dayElementList,
                        ]}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          }
        )
      ) : (
        <></>
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
      <input
        type="button"
        className="float-left bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer text-blue-700 font-semibold"
        onClick={() =>
          authCtx.createPlan(authCtx.loggedInfo.uid, planNum + 1)
        }
        value="+"
      ></input>
    </div>
  );
}

export default TourPlanList;
