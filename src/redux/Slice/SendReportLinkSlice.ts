import { createSlice } from "@reduxjs/toolkit";
import {
  sendReportLink,
  ReportLink,
} from "../Api";

interface SendReportLinkState {
  loading: boolean;
  data: ReportLink | null;
  success: boolean;
  error: string | null;
}

const initialState: SendReportLinkState = {
  loading: false,
  data: null,
  success: false,
  error: null,
};

const SendReportLinkSlice = createSlice({
  name: "sendReportLink",
  initialState,
  reducers: {
    resetSendReportLink: (state) => {
      state.loading = false;
      state.success = false;
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(sendReportLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendReportLink.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })

      .addCase(sendReportLink.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetSendReportLink } =
  SendReportLinkSlice.actions;

export default SendReportLinkSlice.reducer;