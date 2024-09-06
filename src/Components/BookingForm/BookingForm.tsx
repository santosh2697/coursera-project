import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExclamationIcon from "../../assets/exclamation-circle.svg";

const BookingForm = ({
  availableTimes,
  dispatch = (p0: { type: string; val: any }) => {},
  mockSubmit = () => {},
}) => {
  const [date, setDate] = useState("");
  const [isDateTouched, setIsDateTouched] = useState(false);

  const [time, setTime] = useState("select");
  const [isTimeTouched, setIsTimeTouched] = useState(false);

  const [noOfGuests, setNoOfGuests] = useState(0);
  const [isNoOfGuestsTouched, setIsNoOfGuestsTouched] = useState(false);

  const [occasion, setOccasion] = useState("select");
  const [isOccasionTouched, setIsOccasionTouched] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (date.length > 0) {
      dispatch({ type: "initializeTimes", val: date });
    }
  }, [date]);

  useEffect(() => {
    if (validateForm()) setSubmitDisabled(false);
    else if (!validateForm() && !submitDisabled) setSubmitDisabled(true);
  }, [date, time, noOfGuests, occasion, submitDisabled]);

  const validateForm = () => {
    const isDateValid = date.length > 0;
    const isTimeValid = time !== "select";
    const noOfGuestsValid = noOfGuests > 0;
    const occasionValid = occasion !== "select";
    return isDateValid && isTimeValid && noOfGuestsValid && occasionValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        date: date,
        time: time,
        noOfGuests: noOfGuests,
        occasion: occasion,
      };

      //call update dispatch
      dispatch({ type: "updateTimes", val: formData });

      //For testing button submit
      mockSubmit();

      setTimeout(() => {
        //Navigate to personal details page after 1s so that local storage updates
        navigate("/about", { state: formData });
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-style">
      <label htmlFor="res-date" className="action-btn-font-style">
        Choose date
      </label>
      <input
        type="date"
        id="res-date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        onBlur={() => setIsDateTouched(true)}
        data-testid="select-date"
        aria-label="On Click"
        className="input-box card-description-font-style"
      />
      {isDateTouched && date.length === 0 && (
        <div className="error-msg">
          <img
            src={ExclamationIcon}
            alt="exclamation-circle"
            className="info-icon"
          />
          <div>Enter valid date</div>
        </div>
      )}

      <label htmlFor="res-time" className="action-btn-font-style">
        Choose time
      </label>
      <select
        id="res-time"
        onChange={(e) => setTime(e.target.value)}
        value={time}
        onBlur={() => setIsTimeTouched(true)}
        data-testid="select-time"
        aria-label="On Click"
        className="input-box card-description-font-style"
      >
        <option value="select">Select Time</option>
        {availableTimes?.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      {isTimeTouched && time === "select" && (
        <div className="error-msg">
          <img
            src={ExclamationIcon}
            alt="exclamation-circle"
            className="info-icon"
          />
          <div>Enter valid time</div>
        </div>
      )}

      <label htmlFor="guests" className="action-btn-font-style">
        Number of guests
      </label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        onChange={(e) => setNoOfGuests(Number(e.target.value))}
        value={noOfGuests}
        onBlur={() => setIsNoOfGuestsTouched(true)}
        data-testid="no-of-guests"
        aria-label="On Click"
        className="input-box card-description-font-style"
      />
      {isNoOfGuestsTouched && noOfGuests < 1 && (
        <div className="error-msg">
          <img
            src={ExclamationIcon}
            alt="exclamation-circle"
            className="info-icon"
          />
          <div>Number of guest should be between 1 and 10</div>
        </div>
      )}

      <label htmlFor="occasion" className="action-btn-font-style">
        Occasion
      </label>
      <select
        id="occasion"
        onChange={(e) => setOccasion(e.target.value)}
        value={occasion}
        onBlur={() => setIsOccasionTouched(true)}
        data-testid="select-occasion"
        aria-label="On Click"
        className="input-box card-description-font-style"
      >
        <option value="select">Select Occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Date">Date</option>
        <option value="Family-outing">Family outing</option>
        <option value="Get-togther">Get togther</option>
      </select>
      {isOccasionTouched && occasion === "select" && (
        <div className="error-msg">
          <img
            src={ExclamationIcon}
            alt="exclamation-circle"
            className="info-icon"
          />
          <div>Enter valid occasion</div>
        </div>
      )}

      <input
        type="submit"
        value="Make Your reservation"
        data-testid="SubmitButton"
        disabled={submitDisabled}
        aria-label="On Click"
        className="action-btn-font-style action-btn"
      />
    </form>
  );
};

export default BookingForm;
