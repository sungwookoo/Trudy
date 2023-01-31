import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./TrudyMap.css";
import SearchBar from "./SearchBar";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 37.460459,
  lng: 126.44068,
};

class TrudyMap extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <LoadScript googleMapsApiKey="AIzaSyCr_VXyq_r6dte_29ocp-T2i6yf30VvUMI" region="US" language="en">
          <div className="google-map">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </div>
        </LoadScript>
      </>
    );
  }
}

export default TrudyMap;
