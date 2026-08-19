import { createSlice } from "@reduxjs/toolkit";
import {
  sendReportLink,
  getAllReportLinks,
  deleteReportLink,
  ReportLink,
} from "../Api";

interface SendReportLinkState {
  loading: boolean;
  data: ReportLink | null;
  reportLinks: ReportLink[]; // For GET ALL
  success: boolean;
  error: string | null;
}

const initialState: SendReportLinkState = {
  loading: false,
  data: null,
  reportLinks: [],
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
      // SEND LINK
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
      })

      // GET ALL LINKS
      .addCase(getAllReportLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReportLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.reportLinks = action.payload.data;
      })
      .addCase(getAllReportLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch report links";
      })

      // DELETE LINK
      .addCase(deleteReportLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportLink.fulfilled, (state, action) => {
        state.loading = false;
        // Option 1: Optimistic update - remove the deleted item from reportLinks array
        // We can just rely on fetching again, or do it here. Doing it here requires knowing the ID, 
        // which is action.meta.arg
        state.reportLinks = state.reportLinks.filter((link) => link._id !== action.meta.arg);
      })
      .addCase(deleteReportLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete report link";
      });
  },
});

export const { resetSendReportLink } =
  SendReportLinkSlice.actions;

export default SendReportLinkSlice.reducer;