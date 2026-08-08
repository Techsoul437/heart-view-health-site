import { createSlice } from "@reduxjs/toolkit";
import { registerLabAdmin ,LabUser } from "../Api";

interface RegisterState {
  loading: boolean;
  success: boolean;
  message: string;
  data: LabUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

const initialState: RegisterState = {
  loading: false,
  success: false,
  message: "",
  data: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

const RegisterLabSlice = createSlice({
  name: "registerLab",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(registerLabAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerLabAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      .addCase(registerLabAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default RegisterLabSlice.reducer;