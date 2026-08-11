import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, Patient } from "../Api";

interface GetAllUsersState {
  loading: boolean;
  users: Patient[];
  success: boolean;
  error: string | null;
}

const initialState: GetAllUsersState = {
  loading: false,
  users: [],
  success: false,
  error: null,
};

const GetAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(
        getAllUsers.fulfilled,
        (
          state,
          action: PayloadAction<{
            success: boolean;
            message: string;
            data: Patient[];
          }>
        ) => {
          state.loading = false;
          state.success = true;
          state.users = action.payload.data;
        }
      )

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export default GetAllUsersSlice.reducer;