import { createSlice } from "@reduxjs/toolkit";
import { getLabUsers, LabUserItem } from "../Api";

interface LabUsersState {
  loading: boolean;
  data: LabUserItem[];
  error: string | null;
}

const initialState: LabUsersState = {
  loading: false,
  data: [],
  error: null,
};

const GetLabUsersSlice = createSlice({
  name: "getLabUsers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getLabUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLabUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })

      .addCase(getLabUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default GetLabUsersSlice.reducer;