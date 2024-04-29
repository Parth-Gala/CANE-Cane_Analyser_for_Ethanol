import React from "react";
import Soildata from "../components/Soildata.jsx";
import { useCoordinate } from "../utils/CoordinateContext.js";

const Soil = () => {
  const { firstMarkerCoordinate } = useCoordinate();
  console.log("First Marker Coordinates:", firstMarkerCoordinate);

  return (
    <div>
      <Soildata lon={firstMarkerCoordinate[1]} lat={firstMarkerCoordinate[0]} /> 
    </div>
  );
};

export default Soil;
