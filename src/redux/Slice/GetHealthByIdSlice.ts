import { createSlice } from "@reduxjs/toolkit";
import { getHealthById, HealthProfile } from "../Api";

interface GetHealthByIdState {
  loading: boolean;
  data: HealthProfile | null;
  error: string | null;
}

const initialState: GetHealthByIdState = {
  loading: false,
  data: null,
  error: null,
};

const GetHealthByIdSlice = createSlice({
  name: "getHealthById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHealthById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHealthById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getHealthById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default GetHealthByIdSlice.reducer;