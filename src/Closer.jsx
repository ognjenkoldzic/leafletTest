import { circle } from "leaflet";
import { useState } from "react";
import { Marker, useMapEvents, LayerGroup } from "react-leaflet";

function Closer({ setPositions, setCurrentPlace, map }) {
  useMapEvents({
    click(ev) {
      setPositions(null);
      setCurrentPlace(null);
      //map.LayerGroup.clearLayers();
    },
  });
  return null;
}

export default Closer;
