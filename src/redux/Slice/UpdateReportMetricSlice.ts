import { createSlice } from "@reduxjs/toolkit";
import { updateReportMetric } from "../Api";

interface UpdateReportMetricState {
  loading: boolean;
  success: boolean;
  message: string;
  report: {
    _id: string;
    matrics: unknown[];
  } | null;
  error: string | null;
}

const initialState: UpdateReportMetricState = {
  loading: false,
  success: false,
  message: "",
  report: null,
  error: null,
};

const UpdateReportMetricSlice = createSlice({
  name: "updateReportMetric",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateReportMetric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateReportMetric.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.report = action.payload.data;
      })

      .addCase(updateReportMetric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default UpdateReportMetricSlice.reducer;