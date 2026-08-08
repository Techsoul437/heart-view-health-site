import { createSlice } from "@reduxjs/toolkit";
import { getAllLabs } from "../Api";
import type { Lab } from "../Api";

interface GetAllLabsState {
  loading: boolean;
  labs: Lab[];
  count: number;
  success: boolean;
  error: string | null;
}

const initialState: GetAllLabsState = {
  loading: false,
  labs: [],
  count: 0,
  success: false,
  error: null,
};

const GetAllLabsSlice = createSlice({
  name: "getAllLabs",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getAllLabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllLabs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.labs = action.payload.data;
        state.count = action.payload.count;
      })

      .addCase(getAllLabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default GetAllLabsSlice.reducer;