import { createSlice } from "@reduxjs/toolkit";
import { getCountries, Country } from "../Api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface GetCountriesState {
  loading: boolean;
  countries: Country[];
  success: boolean;
  message: string;
  error: string | null;
}

const initialState: GetCountriesState = {
  loading: false,
  countries: [],
  success: false,
  message: "",
  error: null,
};

const GetCountriesSlice = createSlice({
  name: "getCountries",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getCountries.fulfilled,
        (state, action: { payload: ApiResponse<Country[]> }) => {
          state.loading = false;
          state.success = action.payload.success;
          state.message = action.payload.message;
          state.countries = action.payload.data;
        }
      )

      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default GetCountriesSlice.reducer;