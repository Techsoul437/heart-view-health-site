import { createSlice } from "@reduxjs/toolkit";
import { getReportsByUser,ReportData  } from "../Api";


interface ReportState {
  loading: boolean;
  reports: ReportData | null;
  error: string | null;
}

const initialState: ReportState = {
  loading: false,
  reports: null,
  error: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getReportsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getReportsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
      })

      .addCase(getReportsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default reportSlice.reducer;