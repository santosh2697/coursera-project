import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header.tsx";
import "./PersonalDetails.css";
import ExclamationIcon from "../../assets/exclamation-circle.svg";

import React, { useEffect, useState } from "react";

const submitAPI = function (formData: any) {
  return true;
};

const PersonalDetails = ({ mockSubmit = () => {} }) => {
  const [firstName, setFirstName] = useState("");
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);

  const [lastName, setLastName] = useState("");
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state, "location--- personal");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateForm = () => {
    const isFirstNameValid = firstName.length > 0;
    const isLastNameValid = lastName.length > 0;
    const isEmailValid = validateEmail(email);
    return isFirstNameValid && isLastNameValid && isEmailValid;
  };

  useEffect(() => {
    if (validateForm()) setSubmitDisabled(false);
    else if (!validateForm() && !submitDisabled) setSubmitDisabled(true);
  }, [firstName, lastName, email, submitDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        ...location.state,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      const isFormSubmitted = submitAPI(formData);

      if (isFormSubmitted) {
        //For testing button submit
        mockSubmit();

        setTimeout(() => {
          //Navigate to Success page after 1s so that local storage updates
          navigate("/confirmed", { state: formData });
        }, 1000);
      }
    }
  };

  return (
    <div className="reservation-page-container">
      <Header />
      <div className="reservation-page-wrapper">
        <div className="subtitle-font-style">Personal details</div>
        <form onSubmit={handleSubmit} className="form-style">
          <label htmlFor="firstName" className="action-btn-font-style">
            First name*
          </label>
          <input
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            onBlur={() => setIsFirstNameTouched(true)}
            data-testid="first-name"
            aria-label="On Click"
            className="input-box card-description-font-style"
          />
          {isFirstNameTouched && firstName.length === 0 && (
            <div className="error-msg">
              <img
                src={ExclamationIcon}
                alt="exclamation-circle"
                className="info-icon"
              />
              <div>First name is required</div>
            </div>
          )}

          <label htmlFor="lastName" className="action-btn-font-style">
            Last name*
          </label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            onBlur={() => setIsLastNameTouched(true)}
            data-testid="last-name"
            aria-label="On Click"
            className="input-box card-description-font-style"
          />
          {isLastNameTouched && lastName.length === 0 && (
            <div className="error-msg">
              <img
                src={ExclamationIcon}
                alt="exclamation-circle"
                className="info-icon"
              />
              <div>Last name is required</div>
            </div>
          )}

          <label htmlFor="email" className="action-btn-font-style">
            Email address*
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={() => setIsEmailTouched(true)}
            data-testid="email"
            aria-label="On Click"
            className="input-box card-description-font-style"
          />
          {isEmailTouched && !validateEmail(email) && (
            <div className="error-msg">
              <img
                src={ExclamationIcon}
                alt="exclamation-circle"
                className="info-icon"
              />
              <div>Please enter a valid email</div>
            </div>
          )}

          <input
            type="submit"
            value="Confirm reservation"
            data-testid="submit-button"
            disabled={submitDisabled}
            aria-label="On Click"
            className="action-btn-font-style action-btn"
          />
        </form>

        <div className="legend">(* Indicates required fields)</div>
      </div>
    </div>
  );
};

export default PersonalDetails;
