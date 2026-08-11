import { createSlice } from "@reduxjs/toolkit";
import { getStaffById, Staff } from "../Api";

interface StaffState {
  loading: boolean;
  staff: Staff | null;
  error: string | null;
}

const initialState: StaffState = {
  loading: false,
  staff: null,
  error: null,
};

const GetStaffByIdSlice = createSlice({
  name: "getStaffById",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStaffById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getStaffById.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload.data;
      })

      .addCase(getStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default GetStaffByIdSlice.reducer;