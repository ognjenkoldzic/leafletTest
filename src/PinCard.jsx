import React from "react";
import { format } from "timeago.js";
import dummyImg from "./assets/dummy-person.jpg";

export default function PinCard({ currentPlace }) {
  // function loadIMage() {
  //   const base64String = btoa(
  //     String.fromCharCode(...new Uint8Array(currentPlace.img.data.data))
  //   );
  //   return <img src={`data:image/png;base64,${base64String}`} width="150" />;
  // }

  console.log(currentPlace);
  return (
    <div className="card">
      <h2>{currentPlace.name}</h2>
      <p>{currentPlace.description}</p>
      <span>
        {currentPlace.address} in {currentPlace.city}
      </span>
      <p className="date">Created {format(currentPlace.createdAt)}</p>

      {currentPlace.img_src ? (
        <img src={currentPlace.img_src} alt="ein bild " width="150" />
      ) : (
        <img src={dummyImg} alt="nur ein dummy" width="150" />
      )}
    </div>
  );
}
