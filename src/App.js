import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage.tsx";
import BookingPage from "./Components/BookingPage/BookingPage.tsx";
import Payment from "./Components/Payment/Payment.tsx";
import SuccessPage from "./Components/SuccessPage/SuccessPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmed" element={<SuccessPage />} />

        <Route path="/payment" element={<Payment />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
