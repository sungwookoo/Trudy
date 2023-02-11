import axios from "axios";
import React, { useState, useEffect } from "react";

interface BookmarkProps {
  data: {
    id: number;
    addr1: string;
    addr2: string | undefined;
    contenttypeid: string | undefined;
    firstimage: any;
    firstimage2: string | undefined;
    mapx: any;
    mapy: any;
    title: string;
    singungucode: string;
    tel: string | undefined;
    zipcode: string | undefined;
  };
  onClick: (mapx: string | number, mapy: string | number) => void;
}

function Bookmark({ memberId }: any) {
  const [bookmarkList, setbookmarkList] = useState<any>([]);

  const getBookmarkStatus = async () => {
    try {
      const response = await axios.get(`api/bookmark?memberId=${memberId}`);
      setbookmarkList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(bookmarkList[2]);
  return (
    <>
      <button onClick={getBookmarkStatus}>BookMark</button>
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
              <h3 className="font-bold text-xl mb-2">{bookmark.title}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Bookmark;
