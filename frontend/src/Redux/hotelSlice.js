import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = "https://hotel-crud-production.up.railway.app/api/hotels";
export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async () => {
    const response = await fetch(
      `${API_URL}?limit=100`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }

    const data = await response.json();

    return data.hotels;
  }
);
export const createHotel = createAsyncThunk(
  "hotels/createHotel",
  async (formData) => {
    const response = await fetch(
      `${API_URL}`,
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
export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async ({ id, formData }) => {
    const response = await fetch(
      `${API_URL}/${id}`,
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
export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async (id) => {
    const response = await fetch(
      `${API_URL}/${id}`,
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
const initialState = {
  hotels: [],
};
const hotelSlice = createSlice({
  name: "hotels",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchHotels.fulfilled,
      (state, action) => {
        state.hotels = action.payload;
      }
    );
    builder.addCase(
      createHotel.fulfilled,
      (state, action) => {
        state.hotels.unshift(action.payload);
      }
    );
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
export default hotelSlice.reducer;