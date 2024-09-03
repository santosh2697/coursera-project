import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const submitAPI = function (formData) {
  return true;
};

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
      const isFormSubmitted = submitAPI(formData);

      if (isFormSubmitted) {
        //call update dispatch
        dispatch({ type: "updateTimes", val: formData });

        //For testing button submit
        mockSubmit();

        setTimeout(() => {
          //Navigate to success page after 1s so that local storage updates
          navigate("/confirmed", { state: formData });
        }, 1000);
      }
    }
  };

  return (
    <form
      style={{ display: "grid", maxWidth: "200px", gap: "20px" }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        onBlur={() => setIsDateTouched(true)}
        data-testid="select-date"
        aria-label="On Click"
      />
      {isDateTouched && date.length === 0 && <div>Enter valid date</div>}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        onChange={(e) => setTime(e.target.value)}
        value={time}
        onBlur={() => setIsTimeTouched(true)}
        data-testid="select-time"
        aria-label="On Click"
      >
        <option value="select">Select Time</option>
        {availableTimes?.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      {isTimeTouched && time === "select" && <div>Enter valid time</div>}

      <label htmlFor="guests">Number of guests</label>
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
      />
      {isNoOfGuestsTouched && noOfGuests < 1 && (
        <div>Number of guest should be between 1 and 10</div>
      )}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        onChange={(e) => setOccasion(e.target.value)}
        value={occasion}
        onBlur={() => setIsOccasionTouched(true)}
        data-testid="select-occasion"
        aria-label="On Click"
      >
        <option value="select">Select Occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      {isOccasionTouched && occasion === "select" && (
        <div>Enter valid occasion</div>
      )}

      <input
        type="submit"
        value="Make Your reservation"
        data-testid="SubmitButton"
        disabled={submitDisabled}
        aria-label="On Click"
      />
    </form>
  );
};

export default BookingForm;
