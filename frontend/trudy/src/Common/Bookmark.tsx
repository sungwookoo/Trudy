import axios from "axios";
import React, { useState, useEffect } from "react";
import Place from "../TrudyMap/Place";

type Props = {
  memberId: number;
  bookmarkedIds: number[];
  setbookmarkedIds: React.Dispatch<React.SetStateAction<any>>;
  setbookmarkList: React.Dispatch<React.SetStateAction<any>>;
  bookmarkList: any;
};

function Bookmark({
  bookmarkList,
  bookmarkedIds,
  setbookmarkedIds,
  memberId,
  setbookmarkList,
}: Props) {
  const token = "bearer " + localStorage.getItem("token");

  // 북마크 해제하기
  const [isLoading, setIsLoading] = useState(false);
  const handleBookmarkClick = async (placeid: any) => {
    setIsLoading(true);
    try {
      const updatedBookmarkedIds = bookmarkedIds.filter(
        (id: any) => id !== placeid
      );
      setbookmarkedIds(updatedBookmarkedIds);
      await axios.delete(`api/bookmark/delete`, {
        params: { memberId: memberId, placeId: placeid },
      });
    } catch (error) {
      console.error(error);
    }
    try {
      const nowBookMark = await axios.get(`api/bookmark?memberId=${memberId}`, {
        headers: {
          Authorization: token,
        },
      });
      setbookmarkList(nowBookMark.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  console.log(bookmarkList, "내 북마크페이지임");
  return (
    <>
      {bookmarkList.map((bookmark: any, idx: number) => {
        return (
          <>
            {bookmark.id in bookmarkedIds ? (
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

                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/128/4101/4101575.png"
                    }
                    className="w-32"
                    alt="bookmark"
                    onClick={() => {
                      handleBookmarkClick(bookmark.id);
                    }}
                    style={{ cursor: "pointer" }}
                  />

                  {isLoading && <div>Loading...</div>}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        );
      })}
    </>
  );
}

export default Bookmark;
