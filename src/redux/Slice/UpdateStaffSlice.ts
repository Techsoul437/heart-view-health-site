import { createSlice } from "@reduxjs/toolkit";
import { updateStaff, Staff } from "../Api";

interface StaffState {
  loading: boolean;
  staff: Staff | null;
  success: boolean;
  error: string | null;
}

const initialState: StaffState = {
  loading: false,
  staff: null,
  success: false,
  error: null,
};

const UpdateStaffSlice = createSlice({
  name: "updateStaff",

  initialState,

  reducers: {
    resetUpdateStaff: (state) => {
      state.loading = false;
      state.staff = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.staff = action.payload.data;
      })

      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { resetUpdateStaff } = UpdateStaffSlice.actions;

export default UpdateStaffSlice.reducer;