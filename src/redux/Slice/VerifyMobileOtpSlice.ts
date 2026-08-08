import { createSlice } from "@reduxjs/toolkit";
import { verifyMobileOtp } from "../Api";

interface VerifyMobileOtpState {
  loading: boolean;
  data: unknown | null;
  error: string | null;
}

const initialState: VerifyMobileOtpState = {
  loading: false,
  data: null,
  error: null,
};

const VerifyMobileOtpSlice = createSlice({
  name: "verifyMobileOtp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyMobileOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyMobileOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(verifyMobileOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP Verification Failed";
      });
  },
});

export default VerifyMobileOtpSlice.reducer;