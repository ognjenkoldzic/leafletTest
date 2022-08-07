import React, { useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function AddNewPinForm({ onSetPins, onSetPositions, positions, pins }) {
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const descriptionRef = useRef(null);
  const public_accessRef = useRef(null);
  const indoorRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const ratingRef = useRef(0);
  const ImageRef = useRef(null);
  const [fileName, setFileName] = useState("pinImage");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  console.log(fileName);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newPin = {
    //   // username: currentUsername,
    //   name: nameRef.current.value,
    //   description: descriptionRef.current.value,
    //   type: typeRef.current.value,
    //   rating: ratingRef.current.value, //star
    //   address: addressRef.current.value,
    //   // public_access,
    //   // indoor,
    //   city: cityRef.current.value,
    //   lat: positions[0],
    //   long: positions[1],
    // };
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("type", typeRef.current.value);
    formData.append("rating", ratingRef.current.value);
    formData.append("address", addressRef.current.value);
    formData.append("city", cityRef.current.value);
    formData.append("lat", positions[0]);
    formData.append("long", positions[1]);
    //formData.append("pinImage", fileName);
    // formData.append("",)
    // formData.append("",)
    // const config = {
    //   headers: {
    //     // "content-type": "multipart/form-data",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    // };

    try {
      const res = await axios.post("http://localhost:8001/api/pins", formData);
      onSetPins([...pins, res.data]); //
      onSetPositions(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="imageUp">Image</label>
        <input
          type="file"
          name="imageUp"
          filename="pinImage"
          onChange={onChangeFile}
        />
        <label>Name *</label>
        <input
          ref={nameRef}
          name="name"
          type="text"
          placeholder="enter a name"
        />
        <label>Type *</label>
        <select ref={typeRef} name="" id="">
          <option value="architecture">Architecture</option>
          <option value="painting">Painitng</option>
          <option value="sulpture">Sulpture</option>
          <option value="music">Music</option>
          <option value="other">other</option>
        </select>
        <label>Description</label>
        <textarea ref={descriptionRef} type="text" placeholder="enter a name" />
        <label>Public Acces ?</label>
        <input ref={public_accessRef} type="checkbox" />
        <label>Indoor ?</label>
        <input ref={indoorRef} type="checkbox" />
        <label>Address</label>
        <input ref={addressRef} type="text" placeholder="enter the address" />
        <label>City *</label>
        <input ref={cityRef} type="text" placeholder="enter the city" />
        <label>Rating </label>
        <select ref={ratingRef} name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button type="submit" className="submitButton">
          {" "}
          Add Venue
        </button>
      </form>
    </div>
  );
}

export default AddNewPinForm;
