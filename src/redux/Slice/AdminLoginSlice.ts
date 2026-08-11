import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginAdminWithEmail,
  AdminLoginResponse,
} from "../Api";

interface AdminLoginState {
  loading: boolean;
  data: AdminLoginResponse | null;
  error: string | null;
}

const initialState: AdminLoginState = {
  loading: false,
  data: null,
  error: null,
};

const AdminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    clearAdminLogin: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAdminWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        loginAdminWithEmail.fulfilled,
        (state, action: PayloadAction<AdminLoginResponse>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )

      .addCase(loginAdminWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Admin login failed";
      });
  },
});

export const { clearAdminLogin } = AdminLoginSlice.actions;

export default AdminLoginSlice.reducer;