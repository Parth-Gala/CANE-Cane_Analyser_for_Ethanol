// CoordinateContext.js
import React, { createContext, useState, useContext } from 'react';

const CoordinateContext = createContext();

export const CoordinateProvider = ({ children }) => {
  const [firstMarkerCoordinate, setFirstMarkerCoordinate] = useState([]);

  return (
    <CoordinateContext.Provider value={{ firstMarkerCoordinate, setFirstMarkerCoordinate }}>
      {children}
    </CoordinateContext.Provider>
  );
};

export const useCoordinate = () => useContext(CoordinateContext);
