import React, { useState } from "react";

const SearchBar = ({ searchChange, setNameSearch, setSearchChange }: any) => {
  // 검색하고 enter 눌렀을 때
  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setNameSearch(searchChange);
    }
  };

  return (
    <>
      {/* ======================검색 ========================= */}
      <div className="flex flex-row ml-2">
        <input
          type="search"
          id="default-search"
          className="block p-3 w-4/5 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          placeholder="Search Name"
          required
          onKeyDown={pressEnter}
          onChange={(e) => {
            setSearchChange(e.target.value);
          }}
        />
        <button
          type="submit"
          className="pl-6  mr-3 bg-white rounded-md border-0 hover:bg-green-700 border-gray-500 items-left"
          onClick={(e) => {
            setNameSearch(searchChange);
          }}
        >
          <svg
            className="w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default SearchBar;
