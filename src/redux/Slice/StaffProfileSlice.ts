import { createSlice } from "@reduxjs/toolkit";
import { getStaffProfile,StaffProfile  } from "../Api";

interface StaffProfileState {
  loading: boolean;
  data: StaffProfile | null;
  error: string | null;
}

const initialState: StaffProfileState = {
  loading: false,
  data: null,
  error: null,
};

const StaffProfileSlice = createSlice({
  name: "staffProfile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStaffProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getStaffProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })

      .addCase(getStaffProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default StaffProfileSlice.reducer;