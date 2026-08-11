import { createSlice } from "@reduxjs/toolkit";
import {
  getAllInquiry,
  deleteInquiry,
  Inquiry,
} from "../Api";

interface InquiryState {
  loading: boolean;
  data: Inquiry[];
  error: string | null;
}

const initialState: InquiryState = {
  loading: false,
  data: [],
  error: null,
};

const InquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get All
      .addCase(getAllInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })

      .addCase(getAllInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Delete
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item._id !== action.meta.arg
        );
      });
  },
});

export default InquirySlice.reducer;