import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  StaffProfile,
  updateStaffProfile,
} from "../Api";

interface UpdateStaffProfileState {
  loading: boolean;
  success: boolean;
  message: string;
  data: StaffProfile | null;
  error: string | null;
}

const initialState: UpdateStaffProfileState = {
  loading: false,
  success: false,
  message: "",
  data: null,
  error: null,
};

const UpdateStaffProfileSlice = createSlice({
  name: "updateStaffProfile",
  initialState,
  reducers: {
    resetUpdateStaffProfile: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateStaffProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(
        updateStaffProfile.fulfilled,
        (
          state,
          action: PayloadAction<{
            success: boolean;
            message: string;
            data: StaffProfile;
          }>
        ) => {
          state.loading = false;
          state.success = action.payload.success;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      )

      .addCase(updateStaffProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdateStaffProfile } =
  UpdateStaffProfileSlice.actions;

export default UpdateStaffProfileSlice.reducer;