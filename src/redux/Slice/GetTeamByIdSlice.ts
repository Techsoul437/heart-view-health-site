import { createSlice } from "@reduxjs/toolkit";
import { getTeamById, TeamMember } from "../Api";

interface GetTeamByIdState {
  team: TeamMember | null;
  loading: boolean;
  error: string | null;
}

const initialState: GetTeamByIdState = {
  team: null,
  loading: false,
  error: null,
};

const getTeamByIdSlice = createSlice({
  name: "getTeamById",
  initialState,
  reducers: {
    resetGetTeamByIdState: (state) => {
      state.team = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTeamById.fulfilled, (state, action) => {
      state.loading = false;
      state.team = action.payload.data || null;
    });
    builder.addCase(getTeamById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetGetTeamByIdState } = getTeamByIdSlice.actions;
export default getTeamByIdSlice.reducer;
