import React from "react";
import { format } from "timeago.js";
import dummyImg from "./assets/dummy-person.jpg";

export default function PinCard({ currentPlace }) {
  return (
    <div className="card">
      <h2>{currentPlace.name}</h2>
      <p>{currentPlace.description}</p>
      <span>
        {currentPlace.address} in {currentPlace.city}
      </span>
      <p className="date">Created {format(currentPlace.createdAt)}</p>
      <img src={dummyImg} alt="nur ein dummy" width="100" height="150" />
    </div>
  );
}
