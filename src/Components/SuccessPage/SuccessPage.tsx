import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.tsx";
import "./SuccessPage.css";
import InfoIcon from "../../assets/info-icon.svg";
import TickCircle from "../../assets/tick-circle.svg";

const SuccessPage = () => {
  const location = useLocation();

  return (
    <div className="reservation-page-container">
      <Header />
      <div className="reservation-wrapper">
        <div className="reservation-heading subtitle-font-style">
          Table has been reserved successfully
          <img src={TickCircle} alt="tick icon" className="tick-icon" />
        </div>
        <div className="reservation-details card-description-font-style">
          <div className="card-title-font-style">Reservation details:</div>
          <div className="date">
            Name: {location.state?.firstName} {location.state?.lastName}
          </div>
          <div className="date">Date: {location.state?.date}</div>
          <div className="time">Time: {location.state?.time}</div>
          <div className="noOfGuests">
            Number of guests: {location.state?.noOfGuests}
          </div>
          <div className="occasion">Occasion: {location.state?.occasion}</div>
        </div>
        <div className="email-notification">
          <img src={InfoIcon} alt="info icon" className="info-icon" />
          <div>An email receipt has been sent to {location.state?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
