import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import HotelForm from "./Components/HotelForm";
import HotelList from "./Pages/HotelList";
import HotelDetails from "./Pages/HotelDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HotelList />}
        />
        <Route
          path="/add"
          element={<HotelForm />}
        />
        <Route
          path="/edit/:id"
          element={<HotelForm />}
        />
        <Route
          path="/hotel/:id"
          element={<HotelDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;