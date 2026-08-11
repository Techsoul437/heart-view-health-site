import { createSlice } from "@reduxjs/toolkit";
import { HeartViewAdmin, updateHeartViewAdminProfile } from "../Api";

interface UpdateHeartViewAdminProfileState {
  loading: boolean;
  success: boolean;
  data: HeartViewAdmin | null;
  error: string | null;
}

const initialState: UpdateHeartViewAdminProfileState = {
  loading: false,
  success: false,
  data: null,
  error: null,
};

const UpdateHeartViewAdminProfileSlice = createSlice({
  name: "updateHeartViewAdminProfile",
  initialState,

  reducers: {
    resetUpdateHeartViewAdminProfile(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(updateHeartViewAdminProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateHeartViewAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })

      .addCase(updateHeartViewAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const {
  resetUpdateHeartViewAdminProfile,
} = UpdateHeartViewAdminProfileSlice.actions;

export default UpdateHeartViewAdminProfileSlice.reducer;