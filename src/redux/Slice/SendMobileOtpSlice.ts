import { createSlice } from "@reduxjs/toolkit";
import { sendMobileOtp } from "../Api";

interface SendMobileOtpState {
  loading: boolean;
  data: unknown | null;
  error: string | null;
}

const initialState: SendMobileOtpState = {
  loading: false,
  data: null,
  error: null,
};

const SendMobileOtpSlice = createSlice({
  name: "sendMobileOtp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMobileOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMobileOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendMobileOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP Send Failed";
      });
  },
});

export default SendMobileOtpSlice.reducer;