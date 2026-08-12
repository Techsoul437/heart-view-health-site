import { configureStore } from "@reduxjs/toolkit";

import GetPatientsReducer from "./Slice/GetPatientsSlice";
import GetCountriesReducer from "./Slice/GetCountriesSlice";
import GetCountryByCodeReducer from "./Slice/GetCountryByCodeSlice";
import GetStaffReducer from "./Slice/GetStaffSlice";
import GetStaffByIdReducer from "./Slice/GetStaffByIdSlice";
import AddStaffReducer from "./Slice/AddStaffSlice";
import UpdateStaffReducer from "./Slice/UpdateStaffSlice";
import DeleteStaffReducer from "./Slice/DeleteStaffSlice";
import RegisterLabReducer from "./Slice/RegisterLabSlice";
// Auth
import VerifyMobileOtpReducer from "./Slice/VerifyMobileOtpSlice";
import RegisterWithEmailReducer from "./Slice/RegisterWithEmailSlice";
import LoginWithMobileReducer from "./Slice/LoginWithMobileSlice";
import LoginWithEmailReducer from "./Slice/LoginWithEmailSlice";
import GetProfileReducer from "./Slice/GetProfileSlice";
import UpdateProfileReducer from "./Slice/UpdateProfileSlice";
import UploadReportReducer from "./Slice/UploadReportSlice";
import UpdateUserReducer from "./Slice/UpdateUserSlice";
import GetAllUsersReducer from "./Slice/GetAllUsersSlice";
import AddOrUpdateHealthReducer from "./Slice/AddOrUpdateHealthSlice";
import GetUserByIdReducer from "./Slice/GetUserByIdSlice";
import GetHealthByIdReducer from "./Slice/GetHealthByIdSlice";
import ReportReducer from "./Slice/GetreportSlice";
import UpdateReportMetricReducer from "./Slice/UpdateReportMetricSlice";
import finalSaveReportReducer from "./Slice/finalSaveReportSlice";
import { DeleteReportMetricReducer } from "./Slice/DeleteReportMetricSlice";
import DeleteUserReducer from "./Slice/DeleteUserSlice";
import reportReducer from "./Slice/reportSlice";
import GetReportByIdReducer from "./Slice/GetReportByIdSlice";
import staffLoginReducer from "./Slice/staffLoginSlice";
import StaffProfileReducer from "./Slice/StaffProfileSlice";
import UpdateStaffProfileReducer from "./Slice/UpdateProfileSlice";
import DeleteReportReducer from "./Slice/DeleteReportSlice";
import SendReportLinkReducer from "./Slice/SendReportLinkSlice";
import GetReportDetailsReducer from "./Slice/GetReportDetailsSlice";
import InquiryReducer from "./Slice/inquirySlice";
import GetAllLabsReducer from "./Slice/GetAllLabsSlice";
import GetLabByIdReducer from "./Slice/Getlabbyidslice";
import AuditLogReducer from "./Slice/AuditLogSlice";
import HeartViewAdminProfileReducer from "./Slice/HeartViewAdminProfileSlice";
import UpdateHeartViewAdminProfileReducer from "./Slice/UpdateHeartViewAdminProfileSlice";
import GetLabUsersReducer from "./Slice/GetLabUsersSlice";
import BlogListReducer from "./Slice/BlogListSlice";
import AdminProfileReducer from "./Slice/AdminProfileSlice";
export const store = configureStore({
  reducer: {
    getPatients: GetPatientsReducer,
    getCountries: GetCountriesReducer,
    getCountryByCode: GetCountryByCodeReducer,

    getStaff: GetStaffReducer,
    getStaffById: GetStaffByIdReducer,
    addStaff: AddStaffReducer,
    updateStaff: UpdateStaffReducer,
    deleteStaff: DeleteStaffReducer,

    // Auth

    verifyMobileOtp: VerifyMobileOtpReducer,
    registerLab: RegisterLabReducer,
    registerWithemail: RegisterWithEmailReducer,
    loginWithMobile: LoginWithMobileReducer,
    loginWithEmail: LoginWithEmailReducer,
    // Profile
    getProfile: GetProfileReducer,
    updateProfile: UpdateProfileReducer,
    uploadReport: UploadReportReducer,

    getAllUsers: GetAllUsersReducer,
    updateUser: UpdateUserReducer,
    addOrUpdateHealth: AddOrUpdateHealthReducer,
    GetUserById: GetUserByIdReducer,
    getHealthById: GetHealthByIdReducer,
    Getreport: ReportReducer,
    updateReportMetric: UpdateReportMetricReducer,
    finalSaveReport: finalSaveReportReducer,
    deleteReportMetric: DeleteReportMetricReducer,
    DeleteUser: DeleteUserReducer,
    allReports: reportReducer,
    getReportById: GetReportByIdReducer,
    StaffLoginReducer: staffLoginReducer,
    staffProfile: StaffProfileReducer,
    updateStaffProfile: UpdateStaffProfileReducer,
    deleteReport: DeleteReportReducer,
    sendReportLink: SendReportLinkReducer,
    getReportDetails: GetReportDetailsReducer,
    inquiry: InquiryReducer,
    getalllabs: GetAllLabsReducer,
    auditLogs: AuditLogReducer,
    getlabbyid: GetLabByIdReducer,
    adminProfile: AdminProfileReducer,
    heartViewAdminProfile: HeartViewAdminProfileReducer,
    updateHeartViewAdminProfile: UpdateHeartViewAdminProfileReducer,
    getLabUsers: GetLabUsersReducer,
    BlogList: BlogListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
