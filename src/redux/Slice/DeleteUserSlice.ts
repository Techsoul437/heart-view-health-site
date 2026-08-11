import { createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "../Api";

interface DeleteUserState {
  loading: boolean;
  success: boolean;
  message: string;
  error: string | null;
}

const initialState: DeleteUserState = {
  loading: false,
  success: false,
  message: "",
  error: null,
};

const DeleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {
    resetDeleteUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteUserState } = DeleteUserSlice.actions;

export default DeleteUserSlice.reducer;