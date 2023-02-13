import axios from "axios";
import React, { useEffect, useState } from "react";
import PlaceForm from "./PlaceForm";
import CategoryButtons from "../Filter/SelectCategory";
import { useLocation, useParams } from "react-router-dom";
import AreaSelect from "../Filter/SelectArea";
import { areaList } from "../Filter/AreaCode";
import { sigunguList } from "../Filter/SigunguCode";
import SigunguSelect from "../Filter/SelectSigungu";
import SearchBar from "../Common/SearchBar";

export type mapPlaceType = {
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

function Place({ onPlaceClick = () => {}, bookmarkedIds, setbookmarkedIds, memberId, setbookmarkList }: any) {
  const [selectedPlace, setSelectedPlace] = useState<mapPlaceType | null>(null);
  const [places, setPlaces] = useState<mapPlaceType[]>([]);
  // 관광 정보 query
  const [limit, setLimit] = useState<any>(10);
  const [offset, setOffset] = useState<any>(0);
  const [areaSigun, setareaSigun] = useState<any>([]);
  const [keyword, setkeyword] = useState<any>("");

  // 카테고리
  const [contentTypeId, setcontentTypeId] = useState<number[]>([]);

  const API_URL: string = "api/place";

  // 지역 filter
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>();
  const [isCollapsed, setIsCollapsed] = useState(true);
  // 시군구 filter
  const [selectedSigungu, setSelectedSigungu] = useState<number[]>([]);

  // 로딩중 spinner
  const [isLoading, setIsLoading] = useState(false);
  // 서치 바
  const [searchChange, setSearchChange] = useState<string>();
  // 초기화
  // 초기화 필터
  const clearFilter = () => {
    setkeyword("");
    setSelectedAreaCode([]);
    setSelectedSigungu([]);
    setcontentTypeId([]);
    setIsCollapsed(true);
  };

  // 카테고리 버튼 on/off
  const handleCategoryClick = (categoryId: number) => {
    if (contentTypeId.includes(categoryId)) {
      setcontentTypeId(contentTypeId.filter((c) => c !== categoryId));
    } else {
      setcontentTypeId([...contentTypeId, categoryId]);
    }
  };
  let userId = useParams();

  // 대분류 선택시 해당 대분류 id 가진 세부지역 checkbox 표시하기
  const handleAreaClick = (id: number) => {
    setSelectedAreaCode(id);
  };

  // 지역 위도 경도 따오기
  const handlePlaceClick = (place: mapPlaceType) => {
    setSelectedPlace(place);
    onPlaceClick(parseFloat(place.mapy), parseFloat(place.mapx));
  };

  // 관광 정보 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData: any = await axios.get(
          API_URL + `?offset=${offset}&limit=${limit}&areaSigun=${areaSigun}&contentTypeId=${contentTypeId}&keyword=${keyword}`
        );
        setPlaces(resData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // 필터 값 바뀌면 limit 값 변경해주기
  }, [limit, offset, areaSigun, contentTypeId, keyword]);

  console.log(places);
  return (
    <>
      {/* 지역 버튼 */}
      <div>
        <div>
          <SearchBar searchChange={searchChange} setNameSearch={setkeyword} setSearchChange={setSearchChange} />
          <button onClick={clearFilter}>Clear</button>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className={`p-2 m-2 rounded-lg  ${!isCollapsed ? "bg-indigo-500 text-white" : "bg-gray-300"}`}>
            Area Select
          </button>
          <div>
            {!isCollapsed && <AreaSelect key={0} areaCode={areaList} onClick={handleAreaClick} />}
            {!isCollapsed && selectedAreaCode && (
              <SigunguSelect
                key={selectedAreaCode}
                selectSigunguCode={sigunguList}
                area={selectedAreaCode}
                selectedSigungu={selectedSigungu}
                setSelectedSigungu={setSelectedSigungu}
                setConvertSigungu={setareaSigun}
              />
            )}
          </div>
        </div>
        {/* 카테고리 */}
        <CategoryButtons onClick={handleCategoryClick} selectedCategories={contentTypeId} />
      </div>
      <div className="flex flex-wrap">
        {places ? (
          places.map((data, i) => {
            return (
              <PlaceForm
                key={i}
                place={data}
                onClick={() => handlePlaceClick(data)}
                bookmarkedIds={bookmarkedIds}
                setbookmarkedIds={setbookmarkedIds}
                memberId={memberId}
                setbookmarkList={setbookmarkList}
              />
            );
          })
        ) : (
          <div> No info. look for another option </div>
        )}
      </div>
      <button onClick={() => setLimit(limit + 10)} color="black">
        more
      </button>
    </>
  );
}

export default Place;
