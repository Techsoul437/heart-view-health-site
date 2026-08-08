import { createSlice } from "@reduxjs/toolkit";
import { getLabById } from "../Api";
import type { Lab } from "../Api";

interface GetLabByIdState {
  loading: boolean;
  lab: Lab | null;
  success: boolean;
  error: string | null;
}

const initialState: GetLabByIdState = {
  loading: false,
  lab: null,
  success: false,
  error: null,
};

const GetLabByIdSlice = createSlice({
  name: "getLabById",
  initialState,
  reducers: {
    clearSelectedLab: (state) => {
      state.lab = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLabById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLabById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.lab = action.payload.data;
      })

      .addCase(getLabById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSelectedLab } = GetLabByIdSlice.actions;
export default GetLabByIdSlice.reducer;