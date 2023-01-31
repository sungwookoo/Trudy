import React from "react";
import Category from "./Category";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="searchBar">
        <div id="mainLogo">
          <img src="이미지 주소" alt="place-now logo" />
        </div>
        <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
        <Category />
      </div>
    );
  }
}

export default SearchBar;
