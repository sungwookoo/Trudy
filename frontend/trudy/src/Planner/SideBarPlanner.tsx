import React from "react";

function SideBarPlanner() {
  return (
    <div className="" id="sideBar">
      <div>
        <input
          type="search"
          className="relative block border "
          id="searchInput"
          placeholder="search"
        ></input>
      </div>
      <div className="" id="regionSelect">
        지역 선택
      </div>
      <div className="" id="categorySelect">
        카테고리 선택
      </div>
      <div className="" id="bookmarkSelect">
        <input type="radio" name="bookmarkSelect" className="" id="all" />
        전체
        <input type="radio" name="bookmarkSelect" className="" id="bookmark" />
        북마크
      </div>
      <div className="" id="results">
        <div className="" id="result">
          결과
        </div>
      </div>
    </div>
  );
}

export default SideBarPlanner;
