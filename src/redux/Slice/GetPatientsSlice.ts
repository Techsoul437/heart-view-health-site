import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, Patient } from "../Api";

interface PatientState {
  patientData: Patient[];
  patientLoading: boolean;
  patientError: string | null;
}

const initialState: PatientState = {
  patientData: [],
  patientLoading: false,
  patientError: null,
};

const GetPatientsSlice = createSlice({
  name: "getPatients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.patientLoading = true;
        state.patientError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.patientLoading = false;
        state.patientData = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.patientLoading = false;
        state.patientError = action.payload ?? null;
      });
  },
});

export default GetPatientsSlice.reducer;