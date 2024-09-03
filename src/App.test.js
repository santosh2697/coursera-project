import { fireEvent, render, screen } from "@testing-library/react";
import BookingPage, {
  fetchAPI,
  reducer,
} from "./Components/BookingPage/BookingPage";
import BookingForm from "./Components/BookingForm/BookingForm";
const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));
const dispatch = jest.fn();

test("Check reservation text on screen", () => {
  render(<BookingPage />);
  const linkElement = screen.getByText(/Make Your reservation/i);
  expect(linkElement).toBeInTheDocument();
});

test("Test reducer functions", () => {
  const slots = fetchAPI(new Date("2024-09-03 8:00"));

  //This method should RESET the time slots
  //Assuming there is no dat in local storage***
  const initializeTimesResponse = reducer(["17:00"], {
    type: "initializeTimes",
    val: "2024-09-03",
  });
  expect(initializeTimesResponse).toStrictEqual(slots);

  //This method should filter out the selected time slot
  //Assuming there is no dat in local storage***
  const updateTimesResponse = reducer(slots, {
    type: "updateTimes",
    val: {
      date: "2024-09-03",
      time: "17:00",
      noOfGuests: 2,
      occasion: "Birthday",
    },
  });

  const filteredTimes = slots.filter((slot) => slot !== "17:00");
  expect(updateTimesResponse).toStrictEqual(filteredTimes);
});

test("Test form submittion", () => {
  const mockSubmit = jest.fn();
  const availableTimes = fetchAPI(new Date("2024-09-03 8:00"));

  render(
    <BookingForm
      mockSubmit={mockSubmit}
      availableTimes={availableTimes}
      dispatch={dispatch}
    />
  );
  const SubmitButton = screen.getByTestId("SubmitButton");
  fireEvent.click(SubmitButton);

  //Check if form is submitted successfully
  //It should fail as user has not entered any valid data
  expect(mockSubmit).not.toHaveBeenCalled();

  const dateEle = screen.getByTestId("select-date");
  fireEvent.change(dateEle, { target: { value: "2024-09-03" } });
  expect(dateEle).toHaveValue("2024-09-03");

  const timeEle = screen.getByTestId("select-time");

  fireEvent.change(timeEle, { target: { value: "17:00" } });
  expect(timeEle).toHaveValue("17:00");

  const noOfguestsEle = screen.getByTestId("no-of-guests");
  fireEvent.change(noOfguestsEle, { target: { value: 3 } });
  expect(noOfguestsEle).toHaveValue(3);

  const occasionEle = screen.getByTestId("select-occasion");
  fireEvent.change(occasionEle, { target: { value: "Birthday" } });
  expect(occasionEle).toHaveValue("Birthday");

  //If user has entered wrong data as per validation code button should be disabled
  //Since user has entered valid data in all fields submit button should be clickable
  expect(SubmitButton).not.toHaveAttribute("disabled");

  fireEvent.click(SubmitButton);

  //Check if form is submitted successfully
  //This time it should pass as user has entered valid data
  expect(mockSubmit).toHaveBeenCalled();
});
