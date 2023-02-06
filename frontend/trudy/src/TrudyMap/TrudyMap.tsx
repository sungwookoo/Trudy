import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import "./TrudyMap.css";
import Place from "./Place";
import AreaSelect from "../Filter/SelectArea";
import { areaCode } from "../Filter/AreaCode";

const API_KEY = String(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const containerStyle = {
  width: "100%",
  height: "100%",
};

function TrudyMap() {
  const [center, setCenter] = useState({ lat: 37.4602, lng: 126.4407 });
  const [zoom, setZoom] = useState(14);
  const [marker, setMarker] = useState({ lat: 37.4602, lng: 126.4407 });
  const [mapVisible, setMapVisible] = useState(true);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    language: "en",
  });
  const [map, setMap] = React.useState(null);
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>();
  const [isCollapsed, setIsCollapsed] = useState(true);

  // 대분류 선택시 세부지역 보여주기
  const handleAreaClick = (id: number) => {
    setSelectedAreaCode(id);
  };

  // 선택시 센터 위도 경도 업데이트
  const updateCenter = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    setZoom(20);
    setMarker({ lat, lng });
    console.log(marker);
  };

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
      <div>
        <button className="mb-2" onClick={() => setIsCollapsed(!isCollapsed)}>
          Select
        </button>
        {!isCollapsed && <AreaSelect areaCode={areaCode} onClick={handleAreaClick} />}
      </div>
      {mapVisible ? (
        <>
          <div className="w-1/4 h-full border border-gray-300 overflow-y-scroll">
            <Place onPlaceClick={updateCenter} />
          </div>
          <div className="w-3/4 h-full">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} onLoad={onLoad} onUnmount={onUnmount}>
              <MarkerF position={marker} />
            </GoogleMap>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap">
          <div className="flex flex-wrap">
            <Place />
          </div>
        </div>
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
