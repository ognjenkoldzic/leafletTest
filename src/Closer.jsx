import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

function Closer({ setPositions, setCurrentPlaceId }) {
  useMapEvents({
    click(ev) {
      setPositions(null);
      setCurrentPlaceId(null);
    },
  });
  return null;
}

export default Closer;
