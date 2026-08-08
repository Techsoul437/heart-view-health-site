import { createSlice } from "@reduxjs/toolkit";
import {
  getReportDetails,
  ReportDetails,
} from "../Api";

interface ReportDetailsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: ReportDetails | null;
}

const initialState: ReportDetailsState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const GetReportDetailsSlice = createSlice({
  name: "getReportDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getReportDetails.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(getReportDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })

      .addCase(getReportDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default GetReportDetailsSlice.reducer;