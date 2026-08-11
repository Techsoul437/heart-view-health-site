import { createSlice } from "@reduxjs/toolkit";
import { deleteStaff } from "../Api";

interface DeleteState {
  loading: boolean;
  success: boolean;
  error: string | null;
  deletingId: string | null;
}

const initialState: DeleteState = {
  loading: false,
  success: false,
  error: null,
  deletingId: null,
};

const DeleteStaffSlice = createSlice({
  name: "deleteStaff",

  initialState,

  reducers: {
    resetDeleteStaff: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.deletingId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteStaff.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.deletingId = action.meta.arg; // jo id delete ho rahi hai
      })

      .addCase(deleteStaff.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.deletingId = null;
      })

      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Something went wrong";
        state.deletingId = null;
      });
  },
});

export const { resetDeleteStaff } = DeleteStaffSlice.actions;

export default DeleteStaffSlice.reducer;