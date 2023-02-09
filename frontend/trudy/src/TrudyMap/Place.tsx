import axios from "axios";
import React, { useEffect, useState } from "react";
import PlaceForm from "./PlaceForm";
import CategoryButtons from "../Filter/SelectCategory";
import AreaSelect from "../Filter/SelectArea";
import { areaCode } from "../Filter/AreaCode";
import { sigunguCode } from "../Filter/SigunguCode";
import SigunguSelect from "../Filter/SelectSigungu";

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

function Place(props: any) {
  const [selectedPlace, setSelectedPlace] = useState<mapPlaceType | null>(null);
  const [places, setPlaces] = useState<mapPlaceType[]>([]);
  const [limit, setLimit] = useState<any>(10);
  const [offset, setOffset] = useState<any>(1);
  const [areaSigun, setareaSigun] = useState<any>([]);
  const [keyword, setkeyword] = useState<any>("");
  const API_URL: string = "api/place";

  const [contentTypeId, setcontentTypeId] = useState<number[]>([]);

  // 지역 filter
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>();
  const [isCollapsed, setIsCollapsed] = useState(true);
  // 시군구 filter
  const [selectedSigungu, setSelectedSigungu] = useState<number[]>([]);
  // 시군구 선택시 지역 + 시군구 변환
  const [convertSigunguCode, setConvertSigungu] = useState<any>([]);

  // 카테고리 버튼 on/off
  const handleCategoryClick = (categoryId: number) => {
    if (contentTypeId.includes(categoryId)) {
      setcontentTypeId(contentTypeId.filter((c) => c !== categoryId));
    } else {
      setcontentTypeId([...contentTypeId, categoryId]);
    }
  };

  // 대분류 선택시 해당 대분류 id 가진 세부지역 checkbox 표시하기
  const handleAreaClick = (id: number) => {
    setSelectedAreaCode(id);
  };

  // 소분류 선택시 areaSigungu 변경하기
  const handleSigunguClick = (sigunguId: any) => {
    setareaSigun([...areaSigun, sigunguId]);
  };

  // 지역 위도 경도 따오기
  const handlePlaceClick = (place: mapPlaceType) => {
    setSelectedPlace(place);
    props.onPlaceClick(parseFloat(place.mapy), parseFloat(place.mapx));
  };
  console.log(areaSigun);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData: any = await axios.get(
          API_URL + `?offset=${offset}&limit=${limit}&areaSigun=${areaSigun}&contentTypeId=${contentTypeId}&keyword=${keyword}`
        );
        setPlaces(resData.data);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchData();
    // 필터 값 바뀌면 limit 값 변경해주기
  }, [limit, offset, areaSigun, contentTypeId, keyword]);
  return (
    <>
      {/* 지역 버튼 */}
      <button onClick={() => setIsCollapsed(!isCollapsed)} className={`p-2 m-2 rounded-lg  ${!isCollapsed ? "bg-indigo-500 text-white" : "bg-gray-300"}`}>
        Area Select
      </button>

      {!isCollapsed && <AreaSelect key={0} areaCode={areaCode} onClick={handleAreaClick} />}
      {!isCollapsed && selectedAreaCode && (
        <SigunguSelect
          key={selectedAreaCode}
          sigunguCode={sigunguCode}
          area={selectedAreaCode}
          selectedSigungu={selectedSigungu}
          setSelectedSigungu={setSelectedSigungu}
          setConvertSigungu={setareaSigun}
          areaSigun={areaSigun}
        />
      )}

      {/* 카테고리 */}
      <CategoryButtons onClick={handleCategoryClick} selectedCategories={contentTypeId} />

      {places &&
        places.map((data, i) => {
          return <PlaceForm key={i} data={data} onClick={() => handlePlaceClick(data)} />;
        })}

      <button onClick={() => setLimit(limit + 10)} color="black">
        more
      </button>
    </>
  );
}

export default Place;
