import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import "./TrudyMap.css";
import Place from "./Place";
import AreaSelect from "../Filter/SelectArea";
import { areaCode } from "../Filter/AreaCode";

const API_KEY = String(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const containerStyle = {
  width: "100%",
  height: "90%",
};

function TrudyMap() {
  // 구글 지도
  const [center, setCenter] = useState({ lat: 37.4602, lng: 126.4407 });
  const [zoom, setZoom] = useState(14);
  const [marker, setMarker] = useState({ lat: 37.4602, lng: 126.4407 });
  const [mapVisible, setMapVisible] = useState(true);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    language: "en",
  });
  const [map, setMap] = React.useState(null);

  // 길찾기
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState({ lat: 37.4602, lng: 126.4407 });
  const [destination, setDestination] = useState({ lat: 37.5665, lng: 126.978 });

  // 지역 filter
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>();
  const [isCollapsed, setIsCollapsed] = useState(true);

  // 카테고리 filter
  const categories = ["Food", "Accommodation", "Festival", "Attraction", "Sports", "Culture", "Shopping"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 대분류 선택시 해당 대분류 id 가진 세부지역 checkbox 표시하기
  const handleAreaClick = (id: number) => {
    setSelectedAreaCode(id);
  };

  // 카테고리 버튼 on/off -> selectedCategories boolean으로 담아주기
  const handleClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 선택시 센터 위도 경도 업데이트
  const updateCenter = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    setZoom(20);
    setMarker({ lat, lng });
    console.log(center);
  };

  // map 생성
  const onLoad = React.useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      setMap(map);
      setZoom(14);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="flex h-screen">
      {/* 지도 보이는 경우  */}
      {mapVisible ? (
        <>
          <div className="w-1/4 h-full border border-gray-300 overflow-y-scroll">
            {/* 지역 버튼 */}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className={`p-2 m-2 rounded-lg  ${!isCollapsed ? "bg-indigo-500 text-white" : "bg-gray-300"}`}>
              Area Select
            </button>

            {!isCollapsed && <AreaSelect key={1} areaCode={areaCode} onClick={handleAreaClick} />}

            {/* 카테고리 */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleClick(category)}
                className={`p-2 m-2 rounded-lg ${selectedCategories.includes(category) ? "bg-indigo-500 text-white" : "bg-gray-300"}`}
              >
                {category}
              </button>
            ))}
            <Place onPlaceClick={updateCenter} />
          </div>
          <div className="w-3/4 h-full">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} onLoad={onLoad} onUnmount={onUnmount}>
              <MarkerF position={marker} />

              {/* OPTIONS 주면 경로선 option 설정 가능 */}
            </GoogleMap>
          </div>
        </>
      ) : (
        <>
          <p>
            <button className="mb-2" onClick={() => setIsCollapsed(!isCollapsed)}>
              Select
            </button>
            <p>{!isCollapsed && <AreaSelect key={1} areaCode={areaCode} onClick={handleAreaClick} />}</p>
          </p>
          <div className="flex flex-wrap">
            <div className="flex flex-wrap">
              <Place />
            </div>
          </div>
        </>
      )}
      <button onClick={() => setMapVisible(!mapVisible)} className="mt-2 absolute top-0 right-0">
        {mapVisible ? "Hide Map" : "Show Map"}
      </button>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(TrudyMap);
