import { createSlice } from "@reduxjs/toolkit";
import { loginWithMobile,LabUser  } from "../Api";

interface LoginState {
  loading: boolean;
  success: boolean;
  message: string;
  user: LabUser | null;
  accessToken: string;
  refreshToken: string;
  error: string | null;
}

const initialState: LoginState = {
  loading: false,
  success: false,
  message: "",
  user: null,
  accessToken: "",
  refreshToken: "",
  error: null,
};

const LoginWithMobileSlice = createSlice({
  name: "loginWithMobile",
  initialState,
  reducers: {
    resetLoginMobile: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginWithMobile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginWithMobile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
       state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      .addCase(loginWithMobile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetLoginMobile } = LoginWithMobileSlice.actions;

export default LoginWithMobileSlice.reducer;