import { createSlice } from "@reduxjs/toolkit";
import { refreshLabToken, LoginResponse } from "../Api";

interface RefreshState {
  loading: boolean;
  data: LoginResponse | null;
  error: string | null;
}

const initialState: RefreshState = {
  loading: false,
  data: null,
  error: null,
};

const RefreshLabTokenSlice = createSlice({
  name: "refreshLabToken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshLabToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshLabToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(refreshLabToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Refresh Failed";
      });
  },
});

export default RefreshLabTokenSlice.reducer;