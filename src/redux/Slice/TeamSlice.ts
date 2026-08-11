import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTeams, addTeam, updateTeam, deleteTeam, TeamMember } from "../Api";

interface TeamState {
  teams: TeamMember[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
  success: false,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    resetTeamState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // getTeams
    builder.addCase(getTeams.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload.data || [];
    });
    builder.addCase(getTeams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // addTeam
    builder.addCase(addTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addTeam.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // updateTeam
    builder.addCase(updateTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateTeam.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // deleteTeam
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteTeam.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetTeamState } = teamSlice.actions;
export default teamSlice.reducer;
