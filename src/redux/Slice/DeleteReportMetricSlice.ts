import { createSlice } from "@reduxjs/toolkit";
import { deleteReportMetric, ReportData } from "../Api";

interface DeleteReportMetricState {
  loading: boolean;
  success: boolean;
  message: string;
  report: ReportData | null;
  error: string | null;
}

const initialState: DeleteReportMetricState = {
  loading: false,
  success: false,
  message: "",
  report: null,
  error: null,
};

const DeleteReportMetricSlice = createSlice({
  name: "DeleteReportMetric",
  initialState,
  reducers: {
    resetDeleteReportMetric: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.report = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(deleteReportMetric.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(deleteReportMetric.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.report = action.payload.data;
      })

      .addCase(deleteReportMetric.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDeleteReportMetric } =
  DeleteReportMetricSlice.actions;

export const DeleteReportMetricReducer =
  DeleteReportMetricSlice.reducer;