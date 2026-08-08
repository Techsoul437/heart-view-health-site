import { createSlice } from "@reduxjs/toolkit";
import { getProfile, LabProfile } from "../Api";

interface GetProfileState {
  loading: boolean;
  profile: LabProfile | null;
  error: string | null;
}

const initialState: GetProfileState = {
  loading: false,
  profile: null,
  error: null,
};

const GetProfileSlice = createSlice({
  name: "getProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default GetProfileSlice.reducer;