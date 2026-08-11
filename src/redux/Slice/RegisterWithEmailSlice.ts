import { createSlice } from "@reduxjs/toolkit";
import { registerWithEmail,LabUser  } from "../Api";

interface RegisterState {
  loading: boolean;
  success: boolean;
  message: string;
  user: LabUser | null;
  accessToken: string;
  refreshToken: string;
  error: string | null;
}
const initialState: RegisterState = {
  loading: false,
  success: false,
  message: "",
  user: null,
  accessToken: "",
  refreshToken: "",
  error: null,
};

const RegisterWithEmailSlice = createSlice({
  name: "registerWithEmail",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
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

      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetRegisterState } =
  RegisterWithEmailSlice.actions;

export default RegisterWithEmailSlice.reducer;