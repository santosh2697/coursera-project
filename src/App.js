import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage.tsx";
import BookingPage from "./Components/BookingPage/BookingPage.tsx";
import SuccessPage from "./Components/SuccessPage/SuccessPage.tsx";
import PersonalDetails from "./Components/PersonalDetailsPage/PersonalDetails.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<PersonalDetails />} />
        <Route path="/confirmed" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
