import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import SearchBar from "../Common/SearchBar";
import AreaSelect from "../Filter/SelectArea";
import CategoryButtons from "../Filter/SelectCategory";

type Props = {
  memberId: number;
  bookmarkedIds: number[];
  setbookmarkedIds: React.Dispatch<React.SetStateAction<any>>;
  setbookmarkList: React.Dispatch<React.SetStateAction<any>>;
  bookmarkList: any;
  onPlaceClick?: (mapx: number, mapy: number) => void;
};

function Bookmark({ bookmarkList, bookmarkedIds, setbookmarkedIds, memberId, setbookmarkList, onPlaceClick = () => {} }: Props) {
  const token = "bearer " + localStorage.getItem("token");
  // 북마크 필터링
  const [filteredBookmarks, setfilteredBookmarks] = useState<any>([]);

  // =================================================================북마크 업데이트 =====================================================================================
  const [isLoading, setIsLoading] = useState(false);
  const handleBookmarkClick = async (placeid: any) => {
    setIsLoading(true);
    // 삭제 후 get요청으로 다시 북마크 받기
    try {
      const updatedBookmarkedIds = bookmarkedIds.filter((id: any) => id !== placeid);
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
  //==================================================== 필터 ================================================================
  // 서치 바
  const [nameSearch, setNameSearch] = useState<string>();
  const [searchChange, setSearchChange] = useState<string>();

  // 초기화 필터
  const clearFilter = () => {
    setNameSearch("");
    setareaCode(undefined);
    setSelectedSigungu([]);
    setbookMarkCategory([]);
    setIsCollapsed(true);
  };

  // 지역 filter
  const [areaCode, setareaCode] = useState<any>();
  const [isCollapsed, setIsCollapsed] = useState(true);
  // 대분류 선택시 해당 대분류 id 가진 세부지역 checkbox 표시하기
  const handleAreaClick = (id: number) => {
    setareaCode(id);
  };
  // 시군구 filter
  const [selectedSigungu, setSelectedSigungu] = useState<number[]>([]);
  // 카테고리 버튼 on/off
  // 카테고리
  const [bookMarkCategory, setbookMarkCategory] = useState<number[]>([]);
  const handleCategoryClick = (categoryId: number) => {
    if (bookMarkCategory.includes(categoryId)) {
      setbookMarkCategory(bookMarkCategory.filter((c) => c !== categoryId));
    } else {
      setbookMarkCategory([...bookMarkCategory, categoryId]);
    }
  };
  // =========================================================필터 적용 ==========================================================
  useEffect(() => {
    setfilteredBookmarks(
      bookmarkList.filter((bookmark: any) => {
        if (selectedSigungu.length === 0 && bookMarkCategory.length === 0 && !areaCode && !nameSearch) {
          return true;
        }

        let sigunguMatch = false;
        let contentTypeMatch = false;
        let areaMatch = false;
        let titleMatch = false;
        if (nameSearch) {
          titleMatch = bookmark.title.toLowerCase().includes(nameSearch.toLowerCase());
        } else {
          titleMatch = true;
        }
        if (selectedSigungu.length > 0) {
          sigunguMatch = selectedSigungu.includes(parseInt(bookmark.sigungucode));
          console.log(parseInt(bookmark.sigungucode));
          console.log(selectedSigungu);
        } else {
          sigunguMatch = true;
        }

        if (bookMarkCategory.length > 0) {
          contentTypeMatch = bookMarkCategory.includes(parseInt(bookmark.contenttypeid));
          console.log(bookmark.contenttypeid);
        } else {
          contentTypeMatch = true;
        }

        if (areaCode) {
          areaMatch = parseInt(bookmark.areacode) === areaCode;
        } else {
          areaMatch = true;
        }

        return sigunguMatch && contentTypeMatch && areaMatch && titleMatch;
      })
    );
  }, [bookmarkList, nameSearch, bookMarkCategory, areaCode, selectedSigungu]);

  // ==========================================================클릭시 지도 옮겨주기====================================================================

  // 지도 센터 옮기기
  const handleClick = (mapx: number, mapy: number) => {
    console.log(mapx, mapy, 342341412412);
    onPlaceClick(mapx, mapy);
  };

  return (
    <>
      <div>
        <SearchBar searchChange={searchChange} setNameSearch={setNameSearch} setSearchChange={setSearchChange} />
        <button onClick={clearFilter}>Clear</button>
        {/* --------------------------------------------------------필터 ----------------------------------------------- */}
        {/* --------------------------------------------------------필터 ----------------------------------------------- */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className={`p-2 m-2 rounded-lg  ${!isCollapsed ? "bg-indigo-500 text-white" : "bg-gray-300"}`}>
          Area Select
        </button>
        <div>{!isCollapsed && <AreaSelect key={0} areaCode={areaList} onClick={handleAreaClick} />}</div>
        {!isCollapsed && areaCode && (
          <div className="flex flex-wrap">
            {/* // 시군구 선택 */}
            {sigunguList[areaCode].map((sigunguInfo: any, i: number) => (
              <div key={i} className="flex items-center mb-2">
                <input
                  className="mr-2"
                  type="checkbox"
                  id={`sigungu-${sigunguInfo.id}`}
                  checked={selectedSigungu.includes(sigunguInfo.id)}
                  onChange={() => {
                    if (selectedSigungu.includes(sigunguInfo.sigungucode)) {
                      const filteredSigungu = selectedSigungu.filter((id: number) => id !== sigunguInfo.id);
                      setSelectedSigungu(filteredSigungu);
                    } else {
                      setSelectedSigungu([...selectedSigungu, sigunguInfo.id]);
                    }
                  }}
                />
                <label htmlFor={`sigungu-${sigunguInfo.id}`}>{sigunguInfo.name}</label>
              </div>
            ))}
          </div>
        )}
        <CategoryButtons onClick={handleCategoryClick} selectedCategories={bookMarkCategory} />
      </div>
      {/* ------------------------------------------------북마크 리스트------------------------------------------------- */}
      {/* ------------------------------------------------북마크 리스트------------------------------------------------- */}
      <div className="flex flex-wrap">
        {filteredBookmarks.map((bookmark: any, idx: number) => {
          return (
            <>
              <div
                key={idx}
                className="max-w-sm rounded overflow-hidden shadow-lg m-5"
                onClick={() => handleClick(parseFloat(bookmark.mapx), parseFloat(bookmark.mapy))}
                style={{ cursor: "pointer" }}
              >
                {<img className="w-full" src={bookmark.firstimage} alt="Place thumbnail" />}
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2">{bookmark.title}</h3>
                </div>
                <img
                  src={"https://cdn-icons-png.flaticon.com/128/4101/4101575.png"}
                  className="w-16 "
                  alt="bookmark"
                  onClick={() => {
                    handleBookmarkClick(bookmark.id);
                  }}
                  style={{ cursor: "pointer" }}
                />

                {isLoading && <div>Loading...</div>}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Bookmark;
