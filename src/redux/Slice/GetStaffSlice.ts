import { createSlice } from "@reduxjs/toolkit";
import { getAllStaff, Staff } from "../Api";

interface StaffState {
  loading: boolean;
  staff: Staff[];
  error: string | null;
}

const initialState: StaffState = {
  loading: false,
  staff: [],
  error: null,
};

const GetStaffSlice = createSlice({
  name: "getStaff",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload.data;
      })

      .addCase(getAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default GetStaffSlice.reducer;