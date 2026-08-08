import { createSlice } from "@reduxjs/toolkit";
import { getCountryByCode, Country } from "../Api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface GetCountryByCodeState {
  loading: boolean;
  country: Country | null;
  success: boolean;
  message: string;
  error: string | null;
}

const initialState: GetCountryByCodeState = {
  loading: false,
  country: null,
  success: false,
  message: "",
  error: null,
};

const GetCountryByCodeSlice = createSlice({
  name: "getCountryByCode",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCountryByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getCountryByCode.fulfilled,
        (state, action: { payload: ApiResponse<Country> }) => {
          state.loading = false;
          state.success = action.payload.success;
          state.message = action.payload.message;
          state.country = action.payload.data;
        }
      )

      .addCase(getCountryByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default GetCountryByCodeSlice.reducer;