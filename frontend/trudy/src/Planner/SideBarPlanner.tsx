import React from "react";

function SideBarPlanner() {
  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col justify-between flex-1 ">
        <nav className="flex-1 -mx-3">
          <div className="relative">
            <input
              type="text"
              className="w-full py-1.5 pl-3 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              placeholder="Search"
            />
            <button className="absolute inset-y-0 right-3 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>

          <div className="border flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
            지역 선택
          </div>

          <div className="border flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
            카테고리 선택
          </div>

          <div>
            <div className="inline-block w-1/2 border">
              <label htmlFor="all">
                <input
                  className="flex items-center"
                  type="radio"
                  name="bookmark"
                  id="all"
                />
                <p className="inline">All</p>
              </label>
            </div>
            <div className="inline-block w-1/2 border">
              <label htmlFor="bookmark">
                <input
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  type="radio"
                  name="bookmark"
                  id="bookmark"
                />
                <p className="inline">Bookmark</p>
              </label>
            </div>
          </div>

          <div className="py-2">
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
              <img
                className="object-cover w-full h-32 mt-2 rounded-lg"
                src="https://images.chosun.com/resizer/2Hyf_QrHJgWDcDfrXnoWJEljBEw=/1280x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/RQT7SJDGZBJTRC3VJRLPS7SNA4.jpg"
                alt=""
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                검색 결과 컴포넌트
              </p>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default SideBarPlanner;
