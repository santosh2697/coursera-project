import React, { useReducer } from "react";
import Header from "../Header/Header.tsx";
import BookingForm from "../BookingForm/BookingForm.tsx";

export const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

export const fetchAPI = function (date) {
  let result: string[] = [];
  let random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ":00");
    }
    if (random() < 0.5) {
      result.push(i + ":30");
    }
  }
  return result;
};

export const reducer = (state, action) => {
  //if any slots are booked in selected date
  switch (action.type) {
    case "updateTimes":
      const copyArr = [...state];
      let filteredArr = copyArr.filter((val) => val !== action.val.time);

      const bookedDates = localStorage.getItem("bookedDates");

      //There are no booked slots
      if (!bookedDates || bookedDates === "null") {
        const data = { [action.val.date]: [action.val.time] };
        localStorage.setItem("bookedDates", JSON.stringify(data));
      } else {
        const bookedDatesJson = JSON.parse(bookedDates);

        //if selected date does not exist
        if (!bookedDatesJson?.[action.val.date]) {
          bookedDatesJson[action.val.date] = [action.val.time];
        } else {
          //Adding time to existing booked slots
          const bookedSlots = new Set(bookedDatesJson[action.val.date]);
          bookedDatesJson[action.val.date].push(action.val.time);

          filteredArr = filteredArr.filter((time) => !bookedSlots.has(time));
        }
        localStorage.setItem("bookedDates", JSON.stringify(bookedDatesJson));
      }

      return filteredArr;
    case "initializeTimes":
      //Fetch new available time slots for selected date
      const date = new Date(action.val);
      let availableSlots = fetchAPI(date);

      const bookedDatesCopy = localStorage.getItem("bookedDates");

      if (!bookedDatesCopy || bookedDatesCopy === "null") {
        return availableSlots;
      } else {
        const bookedDatesJson = JSON.parse(bookedDatesCopy);

        if (bookedDatesJson?.[action?.val]) {
          const bookedSlots = new Set(bookedDatesJson[action.val]);

          availableSlots = availableSlots.filter(
            (time) => !bookedSlots.has(time)
          );
        }
      }
      return availableSlots;
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const BookingPage = () => {
  //By default fetch available slost for current date
  const initialData = fetchAPI(new Date());
  const [availableTimes, dispatch] = useReducer(reducer, initialData);

  return (
    <div className="booking-page-container">
      <Header />
      <div className="booking-page-wrapper">
        <div className="subtitle-font-style">Table Reservation</div>
        <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default BookingPage;
