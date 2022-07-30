import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

function Closer({ setPositions, setCurrentPlace }) {
  useMapEvents({
    click(ev) {
      setPositions(null);
      setCurrentPlace(null);
    },
  });
  return null;
}

export default Closer;
