import { createSlice } from "@reduxjs/toolkit";
import { finalSaveReport ,ReportData} from "../Api";

interface FinalSaveReportState {
  loading: boolean;
  success: boolean;
  message: string;
  data: ReportData | null;
  error: string | null;
}

const initialState: FinalSaveReportState = {
  loading: false,
  success: false,
  message: "",
  data: null,
  error: null,
};

const finalSaveReportSlice = createSlice({
  name: "finalSaveReport",
  initialState,
  reducers: {
    resetFinalSaveReport: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(finalSaveReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(finalSaveReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })

      .addCase(finalSaveReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload as string;
        state.error = action.payload as string;
      });
  },
});

export const { resetFinalSaveReport } = finalSaveReportSlice.actions;

export default finalSaveReportSlice.reducer;