import { createSlice } from "@reduxjs/toolkit";
import { updateProfile, LabProfile } from "../Api";

interface UpdateProfileState {
  loading: boolean;
  profile: LabProfile | null;
  success: boolean;
  error: string | null;
}

const initialState: UpdateProfileState = {
  loading: false,
  profile: null,
  success: false,
  error: null,
};

const UpdateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default UpdateProfileSlice.reducer;