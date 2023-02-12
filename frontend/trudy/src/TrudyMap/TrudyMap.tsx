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
import LoadingScreen from "../Common/Loding";

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

  // 북마크, placeinfo 버튼
  const [selectedInfo, setselectedInfo] = useState<"bookmark" | "placeinfo">(
    "placeinfo"
  );

  // 북마크 정보 저장
  const [bookmarkedIds, setbookmarkedIds] = useState<number[]>([]);
  const [bookmarkList, setbookmarkList] = useState<any>([]);

  // 로그인 여부
  const islogged = useContext(AuthContext);
  // 로그인 정보 들고오기
  const [memberId, setMemberId] = useState<number>();
  const myInfoUrl = "api/member/me";
  const token = "bearer " + localStorage.getItem("token");

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
            `api/bookmark?memberId=${memberId}`
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
    if (bookmarkList) {
      bookmarkList.map((bookmark: any) => tempbookMark.push(bookmark.id));
    }
    setbookmarkedIds(tempbookMark);
  }, [bookmarkList]);

  // 길찾기
  // const [directions, setDirections] = useState(null);
  // const [origin, setOrigin] = useState({ lat: 37.4602, lng: 126.4407 });
  // const [destination, setDestination] = useState({
  //   lat: 37.5665,
  //   lng: 126.978,
  // });
  // 선택시 센터 위도 경도 업데이트
  const updateCenter = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    setZoom(20);
    setMarker({ lat, lng });
  };
  console.log(
    bookmarkedIds,
    "메인에서 보내는아이딛ㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ"
  );
  console.log(
    bookmarkList,
    "메인에서 보내는리스틑ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ"
  );
  // map 생성x
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

  return (
    <div className="flex h-screen">
      {/* 지도 보이는 경우 -------------------------------------------------------------------------- */}
      {mapVisible ? (
        <>
          <div className="w-1/4 h-full border border-gray-300 overflow-y-scroll">
            {memberId ? (
              // ----------------------------------------------------------------------------------------------------------------------------------------------------
              //                                                         로그인이 되어있는 경우
              // ----------------------------------------------------------------------------------------------------------------------------------------------------
              <>
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
                {selectedInfo === "bookmark" ? (
                  // {/* 북마크 보기 ----------------------------------------------------------------------------------------------------------------------------------------------------*/}
                  <Bookmark
                    bookmarkedIds={bookmarkedIds}
                    bookmarkList={bookmarkList}
                    setbookmarkedIds={setbookmarkedIds}
                    memberId={memberId}
                    setbookmarkList={setbookmarkList}
                  ></Bookmark>
                ) : (
                  // ----------------------------------------------------------------------------------------------------------------------------------------------------
                  //     장소 보기
                  <Place
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
              />
            )}
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/*                                                                     구글 지도  */}
          {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
          {isLoaded && (
            <div className="w-3/4 h-full">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <MarkerF position={marker} />

                {/* OPTIONS 주면 경로선 option 설정 가능 */}
              </GoogleMap>
            </div>
          )}
        </>
      ) : (
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        //                                                                지도 숨겼을 떄
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        <>
          <div>
            <div className="flex items-center justify-center">
              {memberId ? (
                <>
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
                  {selectedInfo === "bookmark" ? (
                    <Bookmark
                      bookmarkedIds={bookmarkedIds}
                      bookmarkList={bookmarkList}
                      setbookmarkedIds={setbookmarkedIds}
                      memberId={memberId}
                      setbookmarkList={setbookmarkList}
                    ></Bookmark>
                  ) : (
                    <div className="flex flex-column">
                      <Place
                        onPlaceClick={updateCenter}
                        bookmarkedIds={bookmarkedIds}
                        setbookmarkedIds={setbookmarkedIds}
                        memberId={memberId}
                        setbookmarkList={setbookmarkList}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-column">
                  <Place
                    onPlaceClick={updateCenter}
                    bookmarkedIds={bookmarkedIds}
                    setbookmarkedIds={setbookmarkedIds}
                    memberId={memberId}
                    setbookmarkList={setbookmarkList}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => setMapVisible(!mapVisible)}
        className="mt-2 absolute top-0 right-0"
      >
        {mapVisible ? "Hide Map" : "Show Map"}
      </button>
    </div>
  );
}

export default React.memo(TrudyMap);
