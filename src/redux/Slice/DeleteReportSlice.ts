import { createSlice } from "@reduxjs/toolkit";
import { deleteReport } from "../Api";

interface DeleteReportState {
  loading: boolean;
  success: boolean;
  message: string;
  error: string | null;
}

const initialState: DeleteReportState = {
  loading: false,
  success: false,
  message: "",
  error: null,
};

const DeleteReportSlice = createSlice({
  name: "deleteReport",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })

      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default DeleteReportSlice.reducer;