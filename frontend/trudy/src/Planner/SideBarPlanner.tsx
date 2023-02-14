import React, { useEffect, useState } from "react";
import Bookmark from "../Common/Bookmark";
import axios from "axios";

function SideBarPlanner() {
  // 북마크 정보 저장
  const [bookmarkedIds, setbookmarkedIds] = useState<number[]>([]);
  const [bookmarkList, setbookmarkList] = useState<any>([]);
  const [bookmarkMarker, setbookmarkMarker] = useState<any>([]);
  // 로그인 정보 들고오기
  const [memberId, setMemberId] = useState<number>();
  const token = "bearer " + localStorage.getItem("token");
  const myInfoUrl = "api/member/me";
  useEffect(() => {
    (async () => {
      try {
        const myInfoResponse = await axios.get(myInfoUrl, {
          headers: {
            Authorization: token,
          },
        });
        setMemberId(myInfoResponse.data.id);
      } catch (error) {
        console.error(error);
      }
      if (memberId) {
        try {
          const bookmarkResponse = await axios.get(`api/bookmark?memberId=${memberId}`, {
            headers: {
              Authorization: token,
            },
          });
          setbookmarkList(bookmarkResponse.data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [memberId]);
  useEffect(() => {
    const tempbookMark: any = [];
    const markMarker: any = [];
    if (bookmarkList) {
      bookmarkList.map((bookmark: any) => {
        tempbookMark.push(bookmark.id);
        markMarker.push({
          lat: parseFloat(bookmark.mapy),
          lng: parseFloat(bookmark.mapx),
        });
      });
    }
    setbookmarkMarker(markMarker);
    setbookmarkedIds(tempbookMark);
  }, [bookmarkList]);
  return (
    <aside className="flex flex-col w-96 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      {memberId && (
        <Bookmark
          bookmarkedIds={bookmarkedIds}
          bookmarkList={bookmarkList}
          setbookmarkedIds={setbookmarkedIds}
          memberId={memberId}
          setbookmarkList={setbookmarkList}
        />
      )}
    </aside>
  );
}

export default SideBarPlanner;
