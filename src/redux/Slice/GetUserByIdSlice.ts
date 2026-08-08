import { createSlice } from "@reduxjs/toolkit";
import { Patient ,getUserById } from "../Api";

interface GetUserByIdState {
  loading: boolean;
  user: Patient | null;
  error: string | null;
}

const initialState: GetUserByIdState = {
  loading: false,
  user: null,
  error: null,
};

const GetUserByIdSlice = createSlice({
  name: "getUserById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default GetUserByIdSlice.reducer;