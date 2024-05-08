import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalDannosParticipationState {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalDannosParticipationState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchTotalDannosParticipation = createAsyncThunk(
  "totalDannosParticipation/fetchTotalDannosParticipation",
  async () => {
    const response = await fetch(
      `${API_URL}/admin/totalDannosParticipationPerMonth`
    );
    return response.json();
  }
);

export const totalDannosParticipationPerMonthSlice = createSlice({
  name: "totalDannosParticipation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalDannosParticipation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTotalDannosParticipation.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(fetchTotalDannosParticipation.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = "Error fetching total dannos participation";
    });
  },
});

export default totalDannosParticipationPerMonthSlice.reducer;
