import { createSlice } from "@reduxjs/toolkit";
import { getAllAuditLogs, AuditLog } from "../Api";

interface AuditLogState {
  loading: boolean;
  success: boolean;
  message: string;
  data: AuditLog[];
}

const initialState: AuditLogState = {
  loading: false,
  success: false,
  message: "",
  data: [],
};

const AuditLogSlice = createSlice({
  name: "auditLogs",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getAllAuditLogs.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
      })

      .addCase(getAllAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.data = action.payload.data;
      })

      .addCase(getAllAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload || "Something went wrong";
      });
  },
});

export default AuditLogSlice.reducer;