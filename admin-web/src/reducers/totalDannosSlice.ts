import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalDannosState {
  total: number;
  totalReceived: number;
  totalSent: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalDannosState = {
  total: 0,
  totalReceived: 0,
  totalSent: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalDannos = createAsyncThunk(
  "totalDannos/fetchTotalDannos",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalDannos`);
    return response.json();
  }
);

export const totalDannosSlice = createSlice({
  name: "totalDannos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalDannos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalDannos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.total;
      state.totalReceived = action.payload.totalReceived;
      state.totalSent = action.payload.totalSent;
      state.error = null;
    });
    builder.addCase(fetchTotalDannos.rejected, (state, action) => {
      state.isLoading = false;
      state.total = 0;
      state.totalReceived = 0;
      state.totalSent = 0;
      state.error = "Error fetching total AUCTIFYS";
    });
  },
});

export default totalDannosSlice.reducer;
