import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ===============================
// FETCH HOTELS
// ===============================

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async () => {
    const response = await fetch(
      "http://localhost:5000/api/hotels"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }

    const data = await response.json();

    return data.hotels;
  }
);

// ===============================
// CREATE HOTEL
// ===============================

export const createHotel = createAsyncThunk(
  "hotels/createHotel",
  async (formData) => {
    const response = await fetch(
      "http://localhost:5000/api/hotels",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create hotel");
    }

    const data = await response.json();

    return data.hotel;
  }
);

// ===============================
// UPDATE HOTEL
// ===============================

export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async ({ id, formData }) => {
    const response = await fetch(
      `http://localhost:5000/api/hotels/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update hotel");
    }

    const data = await response.json();

    return data.hotel;
  }
);

// ===============================
// DELETE HOTEL
// ===============================

export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/hotels/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete hotel");
    }

    return id;
  }
);

// ===============================
// INITIAL STATE
// ===============================

const initialState = {
  hotels: [],
};

// ===============================
// HOTEL SLICE
// ===============================

const hotelSlice = createSlice({
  name: "hotels",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // GET success
    builder.addCase(
      fetchHotels.fulfilled,
      (state, action) => {
        state.hotels = action.payload;
      }
    );

    // POST success
    builder.addCase(
      createHotel.fulfilled,
      (state, action) => {
        state.hotels.unshift(action.payload);
      }
    );

    // PUT success
    builder.addCase(
      updateHotel.fulfilled,
      (state, action) => {
        const index = state.hotels.findIndex(
          (hotel) => hotel.id === action.payload.id
        );

        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      }
    );

    // DELETE success
    builder.addCase(
      deleteHotel.fulfilled,
      (state, action) => {
        state.hotels = state.hotels.filter(
          (hotel) => hotel.id !== action.payload
        );
      }
    );
  },
});

// ===============================
// EXPORT REDUCER
// ===============================

export default hotelSlice.reducer;