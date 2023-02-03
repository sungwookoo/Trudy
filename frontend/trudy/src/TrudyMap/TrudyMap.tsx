import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import "./TrudyMap.css";
import Place from "./Place";

const API_KEY = String(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const containerStyle = {
  width: "1350px",
  height: "850px",
};

function TrudyMap() {
  const [center, setCenter] = useState({ lat: 37.4602, lng: 126.4407 });
  const [zoom, setZoom] = useState(14);
  const [marker, setMarker] = useState({ lat: 37.4602, lng: 126.4407 });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    language: "en",
  });
  const [map, setMap] = React.useState(null);

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
    <div className="map-page-container">
      <div className="place-info">
        <button onClick={onLoad}>reset</button>
        <Place onPlaceClick={updateCenter} setCenter={setCenter} />
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} onLoad={onLoad} onUnmount={onUnmount}>
        <MarkerF position={marker} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(TrudyMap);
