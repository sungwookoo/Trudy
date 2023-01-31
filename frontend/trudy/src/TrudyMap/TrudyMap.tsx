import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "1200px",
  height: "1200px",
};

const center = {
  lat: 37.460459,
  lng: 126.44068,
};

class TrudyMap extends Component {
  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyCr_VXyq_r6dte_29ocp-T2i6yf30VvUMI">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default TrudyMap;
