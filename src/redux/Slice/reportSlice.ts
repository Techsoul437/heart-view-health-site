import { createSlice } from "@reduxjs/toolkit";
import { getAllReports } from "../Api"; // path change if needed
import { ReportData } from "../Api";

interface ReportState {
  reports: ReportData[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "allReports",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
      })

      .addCase(getAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default reportSlice.reducer;