import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import HotelForm from "./Components/HotelForm";
import HotelList from "./Pages/HotelList";
import HotelDetails from "./Pages/HotelDetails";

function App() {
  return (
    <BrowserRouter>

      {/* Navigation */}
      <Navbar />

      {/* Application Routes */}
      <Routes>

        {/* Hotel List */}
        <Route
          path="/"
          element={<HotelList />}
        />

        {/* Add Hotel */}
        <Route
          path="/add"
          element={<HotelForm />}
        />

        {/* Edit Hotel */}
        <Route
          path="/edit/:id"
          element={<HotelForm />}
        />

        {/* Hotel Details */}
        <Route
          path="/hotel/:id"
          element={<HotelDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;