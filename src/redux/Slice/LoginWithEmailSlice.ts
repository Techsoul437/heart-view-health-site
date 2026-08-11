import { createSlice } from "@reduxjs/toolkit";
import { loginWithEmail,LabUser} from "../Api";

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

const LoginWithEmailSlice = createSlice({
  name: "loginWithEmail",
  initialState,
  reducers: {
    resetLoginEmail: (state) => {
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

      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetLoginEmail } = LoginWithEmailSlice.actions;

export default LoginWithEmailSlice.reducer;