import "./App.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function MyLocationFinder({ onSetLocationButton, onSetPosition, position }) {
  //const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  //   map.eachLayer(function (layer) {
  //     map.removeLayer(layer);
  //   });
  //   if (!position === null) {
  //     map.removeLayer();
  //   }
  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      const circle = new L.circle();
      map.removeLayer(circle);
      onSetPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      circle(e.latlng, radius);

      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
    onSetLocationButton(false);
  }, [map]);

  return null;
  //position === null ? null : (
  //<Marker position={position} icon={icon}></Marker>
  //);
}

export default MyLocationFinder;
