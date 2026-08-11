import { createSlice } from "@reduxjs/toolkit";
import { updateUser, Patient } from "../Api"; // path apne project ke hisab se

interface UpdateUserState {
  loading: boolean;
  success: boolean;
  data: Patient | null;
  message: string;
  error: string | null;
}

const initialState: UpdateUserState = {
  loading: false,
  success: false,
  data: null,
  message: "",
  error: null,
};

const UpdateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    resetUpdateUser: (state) => {
      state.loading = false;
      state.success = false;
      state.data = null;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdateUser } = UpdateUserSlice.actions;

export default UpdateUserSlice.reducer;