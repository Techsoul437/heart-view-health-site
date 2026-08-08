import { createSlice } from "@reduxjs/toolkit";
import { addOrUpdateHealth,HealthProfileResponse  } from "../Api";

interface HealthState {
  loading: boolean;
  success: boolean;
  message: string;
  data: HealthProfileResponse["data"] | null;
  error: string | null;
}
const initialState: HealthState = {
  loading: false,
  success: false,
  message: "",
  data: null,
  error: null,
};

const AddOrUpdateHealthSlice = createSlice({
  name: "addOrUpdateHealth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(addOrUpdateHealth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addOrUpdateHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })

      .addCase(addOrUpdateHealth.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default AddOrUpdateHealthSlice.reducer;