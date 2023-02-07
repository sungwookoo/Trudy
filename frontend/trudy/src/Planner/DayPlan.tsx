import React, { useState } from "react";

function DayPlan() {
  const [selectedTab, setSelectedTab] = useState("tab1");
  return (
    <div className="flex flex-col">
      <nav className="flex-col-8 absolute right-0">
        <ul className="list-none">
          <li>
            <a
              href="#tab1"
              className={`font-medium block px-4 py-2 text-left text-gray-700 rounded-t hover:text-gray-900 ${
                selectedTab === "tab1" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedTab("tab1")}
            >
              Tab 1
            </a>
          </li>
          <li>
            <a
              href="#tab2"
              className={`font-medium block px-4 py-2 text-left text-gray-700 rounded-t hover:text-gray-900 ${
                selectedTab === "tab2" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedTab("tab2")}
            >
              Tab 2
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex-grow">
        <div className={`p-4 ${selectedTab === "tab1" ? "block" : "hidden"}`}>
          Content of Tab 1
        </div>
        <div className={`p-4 ${selectedTab === "tab2" ? "block" : "hidden"}`}>
          Content of Tab 2
        </div>
      </div>
    </div>
  );
}

export default DayPlan;
