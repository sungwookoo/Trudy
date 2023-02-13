import { useContext, useEffect, useState } from "react";
import AuthContext from "../Common/authContext";
import DayPlan from "./DayPlan";

function DayItemList(dayPlan: any) {
  const [dayItemNum, setDayItemNum] = useState<number>(0);
  const [modal, setModal] = useState<number | null>(null);
  const [hover, setHover] = useState<string>("");

  const authCtx = useContext(AuthContext);
  console.log("dayitem", dayPlan);
  useEffect(() => {
    setDayItemNum(dayPlan.dayPlan.length);
  }, [dayPlan]);

  //   function Modal() {
  //     return (
  //       <div className="absolute flex justify-center">
  //         <h3>진짜 삭제?</h3>
  //         <input
  //           type="button"
  //           className="cursor-pointer border"
  //           value="예"
  //           onClick={() => {
  //             authCtx.deleteDay(modal);
  //             setModal(null);
  //           }}
  //         ></input>
  //         <input
  //           type="button"
  //           className="cursor-pointer border"
  //           value="아니오"
  //           onClick={() => setModal(null)}
  //         ></input>
  //       </div>
  //     );
  //   }

  return (
    <div className="bg-yellow-500 absolute w-10 h-10">
      {dayPlan.dayPlan[1] !== undefined ? (
        dayPlan.dayPlan[1].map(
          (
            day: {
              id: number;
              customTitle: string;
              customImage: string;
              memo: string;
              sequence: any;
            },
            i: number
          ) => {
            return (
              <div key={i} className="bg-blue-900">
                <nav>
                  <ul className="list-none">
                    <li>
                      <div className="flex p-4">
                        <input type="text" value={day.memo} />
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
    </div>
  );
}

export default DayItemList;
