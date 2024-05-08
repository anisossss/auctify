import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalProductsDannosPerMonthState {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalProductsDannosPerMonthState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchTotalProductsDannosPerMonth = createAsyncThunk(
  "totalProductsDannosPerMonth/fetchTotalProductsDannosPerMonth",
  async () => {
    const response = await fetch(
      `${API_URL}/admin/totalProductsDannosPerMonth`
    );
    return response.json();
  }
);

export const totalProductsDannosPerMonthSlice = createSlice({
  name: "totalProductsDannosPerMonth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalProductsDannosPerMonth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTotalProductsDannosPerMonth.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchTotalProductsDannosPerMonth.rejected,
      (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = "Error fetching total products dannos per month";
      }
    );
  },
});

export default totalProductsDannosPerMonthSlice.reducer;
