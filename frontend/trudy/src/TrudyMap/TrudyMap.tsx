import React, { useEffect, useState, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./TrudyMap.css";
import Place from "./Place";
// import Bookmark from "../Common/Bookmark";
import axios from "axios";
import AuthContext from "../Common/authContext";
import Bookmark from "../Common/Bookmark";
import bookmark_yes from "../assets/star_yes.png";
import bookmark_no from "../assets/star_no.png";

const API_KEY = String(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const containerStyle = {
  width: "100%",
  height: "100%",
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
    region: "US",
  });
  const [map, setMap] = React.useState(null);

  // 북마크, placeinfo 버튼
  const [selectedInfo, setselectedInfo] = useState<"bookmark" | "placeinfo">(
    "placeinfo"
  );

  // 북마크 정보 저장
  const [bookmarkedIds, setbookmarkedIds] = useState<number[]>([]);
  const [bookmarkList, setbookmarkList] = useState<any>([]);
  const [bookmarkMarker, setbookmarkMarker] = useState<any>([]);
  // 북마크
  const [bookmarkMarkerLocation, setbookmarkMarkerLocation] = useState<any>([]);
  // 로그인 여부
  const islogged = useContext(AuthContext);
  // 로그인 정보 들고오기
  const [memberId, setMemberId] = useState<number>();
  const myInfoUrl = "api/member/me";
  const token = "bearer " + localStorage.getItem("token");

  // 로그인 정보받아서 -> 북마크 불러와서 -> id 리스트 만들어주기
  useEffect(() => {
    (async () => {
      if (islogged.isLoggedIn) {
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
      }
      if (memberId) {
        try {
          const bookmarkResponse = await axios.get(
            `api/bookmark?memberId=${memberId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
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

  // 선택시 센터 위도 경도 업데이트
  const updateCenter = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    setZoom(20);
    setMarker({ lat, lng });
  };

  // map 생성x
  const onLoad = React.useCallback(
    function callback(map: any) {
      new window.google.maps.LatLngBounds(center);
      setMap(map);
      setZoom(zoom);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <div className="trudy-map flex justify-center">
      {/* 지도 보이는 경우 -------------------------------------------------------------------------- */}
      {mapVisible ? (
        <>
          <div className="w-1/4 h-full border border-gray-300 overflow-y-scroll">
            {memberId ? (
              // ----------------------------------------------------------------------------------------------------------------------------------------------------
              //                                                         로그인이 되어있는 경우
              // ----------------------------------------------------------------------------------------------------------------------------------------------------
              <>
                <div className="flex flex-row justify-center mb-2">
                  <button
                    onClick={() => setselectedInfo("bookmark")}
                    className={`p-4 w-1/2 ${
                      selectedInfo === "bookmark"
                        ? "bg-green-500 text-white font-semibold"
                        : "bg-gray-200 text-slate-400  font-medium"
                    }`}
                  >
                    Bookmark Information
                  </button>
                  <button
                    onClick={() => setselectedInfo("placeinfo")}
                    className={`p-4 w-1/2 ${
                      selectedInfo === "placeinfo"
                        ? "bg-green-500 text-white font-semibold"
                        : "bg-gray-300 text-slate-400 font-medium"
                    }`}
                  >
                    Place Information
                  </button>
                </div>
                {selectedInfo === "bookmark" ? (
                  // {/* 북마크 보기 ----------------------------------------------------------------------------------------------------------------------------------------------------*/}
                  <Bookmark
                    bookmarkedIds={bookmarkedIds}
                    bookmarkList={bookmarkList}
                    setbookmarkedIds={setbookmarkedIds}
                    memberId={memberId}
                    setbookmarkList={setbookmarkList}
                    mapVisible={mapVisible}
                    onPlaceClick={updateCenter}
                  ></Bookmark>
                ) : (
                  // ----------------------------------------------------------------------------------------------------------------------------------------------------
                  //     장소 보기
                  <Place
                    mapVisible={mapVisible}
                    onPlaceClick={updateCenter}
                    bookmarkedIds={bookmarkedIds}
                    setbookmarkedIds={setbookmarkedIds}
                    memberId={memberId}
                    setbookmarkList={setbookmarkList}
                  />
                )}
              </>
            ) : (
              // --------------------------------------------------------------------------
              // 로그인 안되어있는 경우
              <Place
                bookmarkedIds={bookmarkedIds}
                setbookmarkedIds={setbookmarkedIds}
                mapVisible={mapVisible}
                onPlaceClick={updateCenter}
              />
            )}
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/*                                                                     구글 지도  */}
          {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
          {isLoaded ? (
            <div className="w-3/4 h-full">
              <GoogleMap
                key={`${center.lat}-${center.lng}`}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {/* 북마크 출력하기 */}
                {bookmarkList.map((bookmark: any, index: number) => (
                  <MarkerF
                    key={index}
                    position={{
                      lat: parseFloat(bookmark.mapy),
                      lng: parseFloat(bookmark.mapx),
                    }}
                    icon={{
                      url: `${bookmark_yes}`,
                      scaledSize: new google.maps.Size(40, 40),
                    }}
                    animation={google.maps.Animation.BOUNCE}
                  />
                ))}
                <MarkerF
                  position={marker}
                  icon={{
                    url: `${bookmark_no}`,
                    scaledSize: new google.maps.Size(40, 40),
                  }}
                  animation={google.maps.Animation.BOUNCE}
                />
              </GoogleMap>
            </div>
          ) : (
            <div>Please Reloading...</div>
          )}
        </>
      ) : (
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        //                                                                지도 숨겼을 떄
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        <>
          <div>
            <div className="flex flex-row items-center justify-center">
              {memberId ? (
                <>
                  <div>
                    <div className="flex flex-row justify-center">
                      <button
                        onClick={() => setselectedInfo("bookmark")}
                        className={`p-4 m-2 rounded-lg ${
                          selectedInfo === "bookmark"
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        Bookmark Information
                      </button>
                      <button
                        onClick={() => setselectedInfo("placeinfo")}
                        className={`p-4 m-2 rounded-lg ${
                          selectedInfo === "placeinfo"
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        Place Information
                      </button>
                    </div>
                    <div>
                      {selectedInfo === "bookmark" ? (
                        <Bookmark
                          key={Date.now()}
                          bookmarkedIds={bookmarkedIds}
                          bookmarkList={bookmarkList}
                          setbookmarkedIds={setbookmarkedIds}
                          memberId={memberId}
                          setbookmarkList={setbookmarkList}
                          mapVisible={mapVisible}
                        ></Bookmark>
                      ) : (
                        <div className="flex flex-row">
                          <Place
                            bookmarkedIds={bookmarkedIds}
                            setbookmarkedIds={setbookmarkedIds}
                            memberId={memberId}
                            setbookmarkList={setbookmarkList}
                            mapVisible={mapVisible}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-row">
                  <Place
                    bookmarkedIds={bookmarkedIds}
                    setbookmarkedIds={setbookmarkedIds}
                    memberId={memberId}
                    setbookmarkList={setbookmarkList}
                    mapVisible={mapVisible}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={() => setMapVisible(!mapVisible)}
        id="map-toggle"
        className="mt-12 mr-12 absolute top-0 right-0"
      >
        {mapVisible ? "Hide Map" : "Show Map"}
      </button>
    </div>
  );
}

export default TrudyMap;
