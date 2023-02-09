import exp from "constants";
import React from "react";
import { useNavigate } from "react-router";
import Bookmark from "./Bookmark";


function Testground() {


  const navigate = useNavigate();



return (
    <div className="flex flex-row items-center">
      <div>
        <h1>Testground</h1>
        <Bookmark memberId={2} placeId={1} />
      </div>
      <div>
        <h1>Returntohome</h1>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
    </div>
)


}

export default Testground;