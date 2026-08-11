import { createSlice } from "@reduxjs/toolkit";
import {
  loginStaffWithEmail,
  StaffUser,
} from "../Api";

interface StaffLoginState {
  loading: boolean;
  success: boolean;
  error: string | null;
  user: StaffUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: StaffLoginState = {
  loading: false,
  success: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const staffLoginSlice = createSlice({
  name: "staffLogin",
  initialState,
  reducers: {
    logoutStaff(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginStaffWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginStaffWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      .addCase(loginStaffWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Login Failed";
      });
  },
});

export const { logoutStaff } = staffLoginSlice.actions;

export default staffLoginSlice.reducer;