import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.tsx";
import "./SuccessPage.css";

const SuccessPage = () => {
  const location = useLocation();
  console.log(location.state, "location---");

  return (
    <div className="reservation-page-container">
      <Header />
      <div className="reserbation-heading subtitle-font-style">
        Table has been reserved successfully
      </div>
      <div className="reservation-details card-description-font-style">
        <div className="card-title-font-style">Reservation details:</div>
        <div className="date">Date: {location.state.date}</div>
        <div className="time">Time: {location.state.time}</div>
        <div className="noOfGuests">
          Number of guests: {location.state.noOfGuests}
        </div>
        <div className="occasion">Occasion: {location.state.occasion}</div>
      </div>
    </div>
  );
};

export default SuccessPage;
