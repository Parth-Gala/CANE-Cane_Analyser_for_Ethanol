import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import axios from "axios";
import { useCoordinate } from "../utils/CoordinateContext";
import { Link } from "react-router-dom";
const MapComponent = () => {
  const [markerPositions, setMarkerPositions] = useState([]);
  const [isMarkerActive, setIsMarkerActive] = useState(true);
  const [areaDefined, setAreaDefined] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 20.9042, lng: 74.7749 });
  const [ setImageUrl] = useState("");
  // const [zoomLevel, setZoomLevel] = useState(23); // State variable for zoom level
  const mapRef = useRef(null);
  const { setFirstMarkerCoordinate } = useCoordinate();

  const handleMapClick = (event) => {
    if (isMarkerActive && markerPositions.length < 4) {
      const newMarkerPositions = [
        ...markerPositions,
        { lat: event.latLng.lat(), lng: event.latLng.lng() },
      ];
      setMarkerPositions(newMarkerPositions);

      if (newMarkerPositions.length === 1) { 
        setFirstMarkerCoordinate([ event.latLng.lat(), event.latLng.lng() ]);
        console.log("Coordinates added:",event.latLng.lat())
      }

      if (newMarkerPositions.length === 4) {
        setAreaDefined(true);
        console.log("coordinates:", newMarkerPositions);
      }
      setMapCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handleClearMarkers = () => {
    setMarkerPositions([]);
    setAreaDefined((prevState) => false);
    setMapCenter({ lat: 20.9042, lng: 74.7749 });
  };

  const handleToggleMarker = () => {
    setIsMarkerActive(!isMarkerActive);
  };

  const handleSubmit = () => {
    const formattedCoords = markerPositions.map((pos) => ({
      lat: pos.lat,
      lng: pos.lng,
    }));
    axios
      .post("http://localhost:5000/markedpoints", {
        coordinates: formattedCoords,
        zoom: 20,
      })
      .then((response) => {
        setImageUrl(`data:image/png;base64,${response.data}`); // Set image URL directly
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const handleZoomChanged = () => {
  //   if (google && google.maps && google.maps.event) {
  //     google.maps.event.addListenerOnce(mapRef.current, 'zoom_changed', () => {
  //       const currentZoomLevel = mapRef.current.getZoom(); // Retrieve zoom level
  //       console.log('Current Zoom Level:', currentZoomLevel);
  //     });
  //   }
  // };

  // const handleZoomChanged = () => {
  //   // if (mapRef.current) {
  //   //   setZoomLevel(mapRef); // Update zoom level when zoom changes
  //   // }
  //   // console.log(mapRef.current.getZoom());
  //   console.log("Zoom level:", zoomLevel);
  // };

  // const handleZoomChanged = (google, map) => {
  //   const currentZoomLevel = map.getZoom();
  //   console.log("Current Zoom Level:", currentZoomLevel);
  // };

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const handleLocationSelect = (selectedLocation) => {
    let center = { lat: 0, lng: 0 };

    switch (selectedLocation) {
      case "Kolhapur":
        center = { lat: 16.73470833, lng: 74.23110833 };
        break;
      case "Pimpri":
        center = { lat: 19.35048889, lng: 74.66994444 };
        break;
      case "Mohare":
        center = { lat: 16.86250833, lng: 74.15831944 };
        break;
      case "Wardha":
        center = { lat: 16.85431944, lng: 74.15456944 };
        break;
      default:
        break;
    }

    setMapCenter(center);
  };

  useEffect(() => {}, []);

  return (
    <div>
    <LoadScript googleMapsApiKey="AIzaSyC5QkMgaiQo3G7RH95BWJoqzWbKczWVCkU" async>
      <div className="">
        <h1 className=" justify-center flex items-center text-center font-bold text-xl">Choose from Predefined Locations</h1>

        <div className=" justify-center flex items-center  my-2">
          <select onChange={(e) => handleLocationSelect(e.target.value)} className=" text-center border border-designColor">
            <option value="">Select Location</option>
            <option value="Kolhapur">Kolhapur</option>
            <option value="Pimpri">Pimpri</option>
            <option value="Mohare">Mohare</option>
            <option value="Wardha">Wardha</option>
          </select>
        </div>

        <div className=" mx-4 border-4 border-designColor rounded-3xl overflow-hidden">
          <GoogleMap
            ref={mapRef}
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={21}
            onClick={handleMapClick}
            options={{ draggable: isMarkerActive, mapTypeId: "satellite" }}
            tilt={0}
            // onZoomChanged={handleZoomChanged}
            // onZoomChanged={() => handleZoomChanged(google)}
          >
            {markerPositions.map((position, index) => (
              <Marker
                key={index}
                position={position}
                visible={isMarkerActive}
              />
            ))}
            {areaDefined && (
              <Polygon
                paths={markerPositions}
                // strokeColor="#FF0000"
                // strokeOpacity={0.8}
                // fillColor="#FF0000"
                // fillOpacity={0.8}
              />
            )}
          </GoogleMap>
        </div>

        <div className="my-3 flex justify-evenly">
          <button
            onClick={handleClearMarkers}
            className=" p-2 text-lg font-semibold bg-designColor rounded-2xl "
          >
            Clear Markers
          </button>
          <button
            onClick={handleClearMarkers}
            className=" p-2 text-lg font-semibold bg-designColor rounded-2xl "
          >
            <Link to="/soil">Analyize Soil</Link>
          </button>
          <button
            onClick={handleToggleMarker}
            className=" p-2 text-lg font-semibold bg-designColor rounded-2xl"
          >
            {isMarkerActive ? "Deactivate Markers" : "Activate Markers"}
          </button>
          {/* {imageUrl && (
        <div>
          <img src={imageUrl} alt="Map" />
          <a href={imageUrl} download="map.png">Download Image</a>
        </div>
      )} */}
          <button
            onClick={handleSubmit}
            className=" p-2 text-lg font-semibold bg-designColor rounded-2xl"
          >
            Download Image
          </button>
        </div>
      </div>
    
    </LoadScript>
    </div>
  );
};

export default MapComponent;
