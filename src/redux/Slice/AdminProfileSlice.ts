import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAdminProfile,
  updateAdminProfile,
  AdminData,
  AdminProfileResponse,
} from "../Api";

interface AdminProfileState {
  loading: boolean;
  updateLoading: boolean;
  data: AdminData | null;
  error: string | null;
  updateError: string | null;
  updateSuccess: boolean;
}

const initialState: AdminProfileState = {
  loading: false,
  updateLoading: false,
  data: null,
  error: null,
  updateError: null,
  updateSuccess: false,
};

const AdminProfileSlice = createSlice({
  name: "adminProfile",

  initialState,

  reducers: {
    clearAdminProfile: (state) => {
      state.data = null;
      state.error = null;
      state.updateError = null;
      state.loading = false;
      state.updateLoading = false;
      state.updateSuccess = false;
    },

    clearUpdateAdminProfile: (state) => {
      state.updateError = null;
      state.updateSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // GET ADMIN PROFILE - PENDING
      // ==========================
      .addCase(getAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ==========================
      // GET ADMIN PROFILE - SUCCESS
      // ==========================
      .addCase(
        getAdminProfile.fulfilled,
        (state, action: PayloadAction<AdminProfileResponse>) => {
          state.loading = false;

          // API response:
          // {
          //   success: true,
          //   data: {
          //     _id: "...",
          //     fullName: "Admin",
          //     email: "...",
          //     ...
          //   }
          // }

          state.data = action.payload.data;
          state.error = null;
        }
      )

      // ==========================
      // GET ADMIN PROFILE - ERROR
      // ==========================
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error =
          action.payload || "Failed to get admin profile";
      })

      // ==========================
      // UPDATE ADMIN PROFILE - PENDING
      // ==========================
      .addCase(updateAdminProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })

      // ==========================
      // UPDATE ADMIN PROFILE - SUCCESS
      // ==========================
      .addCase(
        updateAdminProfile.fulfilled,
        (state, action: PayloadAction<AdminProfileResponse>) => {
          state.updateLoading = false;

          // Update Redux data with latest profile
          state.data = action.payload.data;

          state.updateError = null;
          state.updateSuccess = true;
        }
      )

      // ==========================
      // UPDATE ADMIN PROFILE - ERROR
      // ==========================
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;

        state.updateError =
          action.payload || "Failed to update admin profile";
      });
  },
});

export const {
  clearAdminProfile,
  clearUpdateAdminProfile,
} = AdminProfileSlice.actions;

export default AdminProfileSlice.reducer;