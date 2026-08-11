import { createSlice } from "@reduxjs/toolkit";
import { loginWithEmail  } from "../Api";

interface LoginState {
  loading: boolean;
  data: unknown;
  error: string | null;
}

const initialState: LoginState = {
  loading: false,
  data: null,
  error: null,
};

const LoginLabSlice = createSlice({
  name: "loginLab",
  initialState,
  reducers: {
    clearLoginState: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginWithEmail .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login Failed";
      });
  },
});

export const { clearLoginState } = LoginLabSlice.actions;
export default LoginLabSlice.reducer;