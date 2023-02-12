import axios from "axios";
import React, { useState, useEffect } from "react";
import Place from "../TrudyMap/Place";

type Props = {
  memberId: number;
  bookmarkedIds: number[];
  setbookmarkedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

function Bookmark({ bookmarkList, bookmarkedIds }: any) {
  // 북마크 정보 들고오기

  return (
    <>
      {bookmarkList.map((bookmark: any, idx: number) => {
        return (
          <div
            key={idx}
            className="max-w-sm rounded overflow-hidden shadow-lg m-5"
            style={{ cursor: "pointer" }}
          >
            {bookmark.firstimage ? (
              <img
                className="w-full"
                src={bookmark.firstimage}
                alt="Place thumbnail"
              />
            ) : (
              ""
            )}
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">
                {bookmark.title}
                북마크
              </h3>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Bookmark;
