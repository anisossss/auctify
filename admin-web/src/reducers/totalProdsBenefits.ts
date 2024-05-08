import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalProdsDannosState {
  totalPrice: number;
  multipliedBenefit: number;
  totalBenefit: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalProdsDannosState = {
  totalPrice: 0,
  multipliedBenefit: 0,
  totalBenefit: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalProdsDannos = createAsyncThunk(
  "totalProdsBenefits/fetchTotalProdsDannos",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalProdsDannos`);
    return response.json();
  }
);

export const totalProdsBenefitsSlice = createSlice({
  name: "totalProdsBenefits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalProdsDannos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalProdsDannos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalPrice = action.payload.prodsDannos[0].totalPrice;
      state.multipliedBenefit = action.payload.prodsDannos[0].multipliedBenefit;
      state.totalBenefit = action.payload.prodsDannos[0].totalBenefit;
      state.error = null;
    });
    builder.addCase(fetchTotalProdsDannos.rejected, (state, action) => {
      state.isLoading = false;
      state.totalPrice = 0;
      state.multipliedBenefit = 0;
      state.totalBenefit = 0;
      state.error = "Error fetching total prods price";
    });
  },
});

export default totalProdsBenefitsSlice.reducer;
