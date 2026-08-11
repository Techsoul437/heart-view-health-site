import { createSlice } from "@reduxjs/toolkit";
import { getReportById, ReportData } from "../Api";

interface GetReportByIdState {
  loading: boolean;
  report: ReportData | null;
  error: string | null;
}

const initialState: GetReportByIdState = {
  loading: false,
  report: null,
  error: null,
};

const GetReportByIdSlice = createSlice({
  name: "getReportById",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.data;
      })

      .addCase(getReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default GetReportByIdSlice.reducer;