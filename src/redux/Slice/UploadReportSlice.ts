import { createSlice } from "@reduxjs/toolkit";
import { uploadReport,UploadReportResponse } from "../Api";

interface UploadReportState {
  loading: boolean;
  success: boolean;
  data: UploadReportResponse | null;
  error: string | null;
}

const initialState: UploadReportState = {
  loading: false,
  success: false,
  data: null,
  error: null,
};

const UploadReportSlice = createSlice({
  name: "uploadReport",
  initialState,
  reducers: {
    resetUploadReport: (state) => {
      state.loading = false;
      state.success = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(uploadReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(uploadReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })

      .addCase(uploadReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Upload failed";
      });
  },
});

export const { resetUploadReport } = UploadReportSlice.actions;

export default UploadReportSlice.reducer;