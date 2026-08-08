import { createSlice } from "@reduxjs/toolkit";
import { addStaff, Staff } from"../Api";

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

const AddStaffSlice = createSlice({
  name: "addStaff",
  initialState,

  reducers: {
    resetAddStaff: (state) => {
      state.loading = false;
      state.staff = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addStaff.pending, (state) => {
        state.loading = true;
        state.success = false;
      })

      .addCase(addStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.staff = action.payload.data;
      })

      .addCase(addStaff.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { resetAddStaff } = AddStaffSlice.actions;
export default AddStaffSlice.reducer;