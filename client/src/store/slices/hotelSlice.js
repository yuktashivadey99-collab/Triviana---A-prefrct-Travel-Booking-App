import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchHotels = createAsyncThunk("hotels/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get("/hotels", { params });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchFeaturedHotels = createAsyncThunk("hotels/featured", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/hotels/featured");
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchHotelById = createAsyncThunk("hotels/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/hotels/${id}`);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const hotelSlice = createSlice({
  name: "hotels",
  initialState: { hotels: [], featured: [], selected: null, loading: false, error: null, total: 0, pages: 0, page: 1 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => { state.loading = true; })
      .addCase(fetchHotels.fulfilled, (state, action) => { state.loading = false; state.hotels = action.payload.hotels; state.total = action.payload.total; state.pages = action.payload.pages; state.page = action.payload.page; })
      .addCase(fetchHotels.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchFeaturedHotels.fulfilled, (state, action) => { state.featured = action.payload; })
      .addCase(fetchHotelById.pending, (state) => { state.loading = true; state.selected = null; })
      .addCase(fetchHotelById.fulfilled, (state, action) => { state.loading = false; state.selected = action.payload; })
      .addCase(fetchHotelById.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default hotelSlice.reducer;