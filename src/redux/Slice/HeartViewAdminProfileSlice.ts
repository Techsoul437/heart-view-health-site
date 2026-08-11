import { createSlice } from "@reduxjs/toolkit";
import { getHeartViewAdminProfile, HeartViewAdmin } from "../Api";

interface HeartViewAdminProfileState {
  loading: boolean;
  data: HeartViewAdmin | null;
  error: string | null;
}

const initialState: HeartViewAdminProfileState = {
  loading: false,
  data: null,
  error: null,
};

const HeartViewAdminProfileSlice = createSlice({
  name: "heartViewAdminProfile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getHeartViewAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getHeartViewAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })

      .addCase(getHeartViewAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default HeartViewAdminProfileSlice.reducer;