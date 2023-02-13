import React from "react";
import { Marker } from "@react-google-maps/api";

const MapMarker = ({ position }: any) => <Marker position={position} />;

export default MapMarker;
