import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./TrudyMap.css";
import Place from "./Place";

const containerStyle = {
  width: "1000px",
  height: "680px",
};

let center = {
  lat: 37.4602,
  lng: 126.4407,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCr_VXyq_r6dte_29ocp-T2i6yf30VvUMI",
    language: "en",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="map-page-container">
      <div className="place-info">
        <Place getPosition={center} />
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} onLoad={onLoad} onUnmount={onUnmount}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
