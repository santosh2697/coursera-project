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
  let result = [];
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
  const bookedDates = localStorage.getItem("bookedDates");
  switch (action.type) {
    case "updateTimes":
      const copyArr = [...state];
      let filteredArr = copyArr.filter((val) => val !== action.val.time);

      //There are no booked slots
      if (bookedDates === null) {
        const data = { [action.val.date]: [action.val.time] };
        localStorage.setItem("bookedDates", JSON.stringify(data));
      } else {
        const bookedDatesJson = JSON.parse(bookedDates);

        //if selected date does not exist
        if (!bookedDatesJson[action.val.date]) {
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

      if (bookedDates !== null) {
        const bookedDatesJson = JSON.parse(bookedDates);

        if (bookedDatesJson[action.val]) {
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
      BookingPage
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
};

export default BookingPage;
